import axios from 'axios'
export default async function downloadImage(src: string) {
  try {
    const response = await axios({
      method: 'GET',
      url: src,
      responseType: 'blob',
    })

    const link = document.createElement('a')
    link.href = URL.createObjectURL(new Blob([response.data]))

    const fileName = src.substring(src.lastIndexOf('/') + 1)
    link.download = fileName + '.jpeg'
    link.click()

    URL.revokeObjectURL(link.href)
    link.remove()
  } catch (error) {
    console.error('Error downloading image:', error)
  }
}
