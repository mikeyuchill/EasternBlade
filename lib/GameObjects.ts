namespace GameObjects {

    export class AdjustedBitmapText extends Phaser.GameObjects.BitmapText {

        private _cachedTint: number = 0xFFFFFF;
        private _cachedTextCanvas: HTMLCanvasElement = null;
        private _cachedTextCanvasCtx: CanvasRenderingContext2D = null;

        // -------------------------------------------------------------------------
        public renderCanvas(renderer, src, interpolationPercentage, camera, parentMatrix) {

            var text = src._text;
            var textLength = text.length;

            if (Phaser.GameObjects.GameObject.RENDER_MASK !== src.renderFlags || textLength === 0 || (src.cameraFilter > 0 && (src.cameraFilter & camera.id))) {
                return;
            }

            var textureFrame = src.frame;

            var chars = src.fontData.chars;
            var lineHeight = src.fontData.lineHeight;
            var letterSpacing = src._letterSpacing;

            var xAdvance = 0;
            var yAdvance = 0;

            var charCode = 0;

            var glyph = null;
            var glyphX = 0;
            var glyphY = 0;
            var glyphW = 0;
            var glyphH = 0;

            var x = 0;
            var y = 0;

            var lastGlyph = null;
            var lastCharCode = 0;

            var ctx = renderer.currentContext;
            var image = src.frame.source.image;

            var textureX = textureFrame.cutX;
            var textureY = textureFrame.cutY;

            var scale = (src._fontSize / src.fontData.size);

            var align = src._align;
            var currentLine = 0;
            var lineOffsetX = 0;

            //  Update the bounds - skipped internally if not dirty
            var bounds = src.getTextBounds(false);

            var lineData = src._bounds.lines;

            if (align === 1) {
                lineOffsetX = (lineData.longest - lineData.lengths[0]) / 2;
            }
            else if (align === 2) {
                lineOffsetX = (lineData.longest - lineData.lengths[0]);
            }

            //  Alpha

            var alpha = camera.alpha * src.alpha;

            if (alpha === 0) {
                //  Nothing to see, so abort early
                return;
            }
            else if (renderer.currentAlpha !== alpha) {
                renderer.currentAlpha = alpha;
                ctx.globalAlpha = alpha;
            }

            //  Blend Mode
            if (renderer.currentBlendMode !== src.blendMode) {
                renderer.currentBlendMode = src.blendMode;
                ctx.globalCompositeOperation = renderer.blendModes[src.blendMode];
            }

            //  Smoothing
            if (renderer.currentScaleMode !== src.scaleMode) {
                renderer.currentScaleMode = src.scaleMode;
            }

            var tx = (src.x - camera.scrollX * src.scrollFactorX) + src.frame.x;
            var ty = (src.y - camera.scrollY * src.scrollFactorY) + src.frame.y;

            var roundPixels = camera.roundPixels;

            if (roundPixels) {
                tx |= 0;
                ty |= 0;
            }

            ctx.save();

            if (parentMatrix !== undefined) {
                var matrix = parentMatrix.matrix;
                ctx.transform(matrix[0], matrix[1], matrix[2], matrix[3], matrix[4], matrix[5]);
            }

            ctx.translate(tx, ty);

            ctx.rotate(src.rotation);

            ctx.translate(-src.displayOriginX, -src.displayOriginY);

            ctx.scale(src.scaleX, src.scaleY);


            // tinted text? Check if tint changed or text changed
            var tint = this.tintTopLeft;
            var drawTinted = tint !== 0xFFFFFF;
            var refreshCached = drawTinted && (this._cachedTint !== tint || this["_dirty"]);
            var cachedWidth = bounds.local.width;
            var cachedHeight = bounds.local.height;

            if (refreshCached) {
                if (this._cachedTextCanvas === null) {
                    this._cachedTextCanvas = Phaser.Display.Canvas.Pool.create(this, cachedWidth, cachedHeight);
                    this._cachedTextCanvasCtx = this._cachedTextCanvas.getContext("2d");
                }

                this._cachedTextCanvasCtx.clearRect(0, 0, cachedWidth, cachedHeight);
                this._cachedTint = tint;
            }

            this["_dirty"] = false;


            // render characters either into game canvas (rendering.currentContext or into temporary canvas
            if (!drawTinted || refreshCached) {

                var targetCtx = ctx;

                // change context if refreshing cached tinted text
                if (refreshCached) {
                    var tmpCanvas = Phaser.Display.Canvas.Pool.create(null, cachedWidth, cachedHeight, Phaser.CANVAS, true);
                    var tmpCtx = tmpCanvas.getContext("2d") as CanvasRenderingContext2D;
                    tmpCtx.clearRect(0, 0, cachedWidth, cachedHeight);

                    targetCtx = tmpCtx;
                }

                // draw characters
                for (var i = 0; i < textLength; i++) {
                    charCode = text.charCodeAt(i);

                    if (charCode === 10) {
                        currentLine++;

                        if (align === 1) {
                            lineOffsetX = (lineData.longest - lineData.lengths[currentLine]) / 2;
                        }
                        else if (align === 2) {
                            lineOffsetX = (lineData.longest - lineData.lengths[currentLine]);
                        }

                        xAdvance = 0;
                        yAdvance += lineHeight;
                        lastGlyph = null;

                        continue;
                    }

                    glyph = chars[charCode];

                    if (!glyph) {
                        continue;
                    }

                    glyphX = textureX + glyph.x;
                    glyphY = textureY + glyph.y;

                    glyphW = glyph.width;
                    glyphH = glyph.height;

                    x = glyph.xOffset + xAdvance;
                    y = glyph.yOffset + yAdvance;

                    if (lastGlyph !== null) {
                        var kerningOffset = glyph.kerning[lastCharCode];
                        x += (kerningOffset !== undefined) ? kerningOffset : 0;
                    }

                    x *= scale;
                    y *= scale;

                    x += lineOffsetX;

                    xAdvance += glyph.xAdvance + letterSpacing;
                    lastGlyph = glyph;
                    lastCharCode = charCode;

                    //  Nothing to render or a space? Then skip to the next glyph
                    if (glyphW === 0 || glyphH === 0 || charCode === 32) {
                        continue;
                    }

                    if (roundPixels) {
                        x |= 0;
                        y |= 0;
                    }

                    targetCtx.save();

                    targetCtx.translate(x, y);

                    targetCtx.scale(scale, scale);

                    targetCtx.drawImage(image, glyphX, glyphY, glyphW, glyphH, 0, 0, glyphW, glyphH);

                    targetCtx.restore();
                }

                // create cached image and return temporary canvas into pool
                if (refreshCached) {
                    var tCan = this._cachedTextCanvas;
                    var tCtx = this._cachedTextCanvasCtx;

                    // resize canvas?
                    if (tCan.width !== cachedWidth || tCan !== cachedHeight) {
                        tCan.width = cachedWidth;
                        tCan.height = cachedHeight;
                    }

                    var rgb = (tint >> 16) + (tint & 0xff00) + ((tint & 0xff) << 16);
                    var color = "#" + ("00000" + (rgb | 0).toString(16)).substr(-6);
                    
                    tCtx.fillStyle = color;
                    tCtx.fillRect(0, 0, cachedWidth, cachedHeight);

                    tCtx.globalCompositeOperation = "multiply";
                    tCtx.drawImage(tmpCanvas, 0, 0, cachedWidth, cachedHeight);

                    tCtx.globalCompositeOperation = "destination-atop";
                    tCtx.drawImage(tmpCanvas, 0, 0, cachedWidth, cachedHeight);

                    Phaser.Display.Canvas.Pool.remove(tmpCanvas);
                }
            }

            // draw tinted image if tinted text
            if (drawTinted) {
                ctx.drawImage(this._cachedTextCanvas, 0, 0, cachedWidth, cachedHeight);
            }

            ctx.restore();
        }

        // -------------------------------------------------------------------------
        public set tint(color: number) {
            this.setTint(color, color, color, color);
        }

        // -------------------------------------------------------------------------
        public setTint(topLeft?: number, topRight?: number, bottomLeft?: number, bottomRight?: number): this {
            super.setTint(topLeft, topRight, bottomLeft, bottomRight);

            let currentTint = this.tintTopLeft;
            if (currentTint !== 0xFFFFFF && this._cachedTint !== currentTint) {
                this["_dirty"] = true;
            }

            return this;
        }

        // -------------------------------------------------------------------------
        public preDestroy(): void {
            if (super["preDestroy"]) {
                super["preDestroy"]();
            }

            console.log("destroying...");

            // remove canvas
            if (this._cachedTextCanvas !== null) {
                Phaser.Display.Canvas.Pool.remove(this);
                this._cachedTextCanvas = null;
                this._cachedTextCanvasCtx = null;
            }
        }
    }
}