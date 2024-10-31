import React, { useState, useCallback } from 'react'
import Cropper from 'react-easy-crop'


export default function ImageCropper() {
    const [image, setImage] = useState<string | null>(null)
    const [crop, setCrop] = useState({ x: 0, y: 0 })
    const [zoom, setZoom] = useState(1)
    const [rotation, setRotation] = useState(0)
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null)
    const [aspectRatio, setAspectRatio] = useState<AspectRatio>('1:1')

    const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels)
    }, [])

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            const reader = new FileReader()
            reader.addEventListener('load', () => setImage(reader.result))
            reader.readAsDataURL(e.target.files[0])
        }
    }

    const handleCropImage = useCallback(() => {
        if (!croppedAreaPixels || !image) return

        const canvas = document.createElement('canvas')
        const img = new Image()
        img.src = image
        img.onload = () => {
            const ctx = canvas.getContext('2d')
            if (!ctx) return

            const scaleX = img.naturalWidth / img.width
            const scaleY = img.naturalHeight / img.height

            canvas.width = croppedAreaPixels.width
            canvas.height = croppedAreaPixels.height

            ctx.drawImage(
                img,
                croppedAreaPixels.x * scaleX,
                croppedAreaPixels.y * scaleY,
                croppedAreaPixels.width * scaleX,
                croppedAreaPixels.height * scaleY,
                0,
                0,
                croppedAreaPixels.width,
                croppedAreaPixels.height
            )

            canvas.toBlob((blob) => {
                if (blob) {
                    const croppedImage = URL.createObjectURL(blob)
                    const link = document.createElement('a')
                    link.download = 'cropped-image.jpg'
                    link.href = croppedImage
                    link.click()
                }
            }, 'image/jpeg')
        }
    }, [croppedAreaPixels, image])

    const aspectRatios = {
        '1:1': 1,
        '4:3': 4 / 3,
        '16:9': 16 / 9,
        'free': undefined
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-md">
                <h1 className="text-2xl font-bold mb-4 text-center">Image Cropper</h1>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="mb-4 w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
                />
                {image && (
                    <div className="mb-4">
                        <div className="relative w-full h-64 mb-4">
                            <Cropper
                                image={image}
                                crop={crop}
                                zoom={zoom}
                                rotation={rotation}
                                aspect={aspectRatios[aspectRatio]}
                                onCropChange={setCrop}
                                onCropComplete={onCropComplete}
                                onZoomChange={setZoom}
                                onRotationChange={setRotation}
                            />
                        </div>
                        <div className="space-y-4">
                            <div>
                                <label htmlFor="zoom" className="block text-sm font-medium text-gray-700 mb-1">
                                    Zoom: {zoom.toFixed(2)}x
                                </label>
                                <input
                                    type="range"
                                    id="zoom"
                                    min={1}
                                    max={3}
                                    step={0.1}
                                    value={zoom}
                                    onChange={(e) => setZoom(parseFloat(e.target.value))}
                                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                                />
                            </div>
                            <div>
                                <label htmlFor="rotation" className="block text-sm font-medium text-gray-700 mb-1">
                                    Rotation: {rotation}°
                                </label>
                                <input
                                    type="range"
                                    id="rotation"
                                    min={0}
                                    max={360}
                                    value={rotation}
                                    onChange={(e) => setRotation(parseInt(e.target.value))}
                                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                                />
                            </div>
                            <div>
                                <label htmlFor="aspect-ratio" className="block text-sm font-medium text-gray-700 mb-1">
                                    Aspect Ratio
                                </label>
                                <select
                                    id="aspect-ratio"
                                    value={aspectRatio}
                                    onChange={(e) => setAspectRatio(e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                >
                                    <option value="1:1">1:1</option>
                                    <option value="4:3">4:3</option>
                                    <option value="16:9">16:9</option>
                                    <option value="free">Free</option>
                                </select>
                            </div>
                            <button
                                onClick={handleCropImage}
                                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            >
                                Crop Image
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}