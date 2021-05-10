//borrowed part of code from quasar/ui/src/utils/export-file.js
function clean (link) {
    link.remove()
}
  
export default function (fileName, url) {
  
    const link = document.createElement('a')
  
    link.download = fileName
    link.href = url
  
    link.classList.add('hidden')
    link.style.position = 'fixed' // avoid scrolling to bottom
    document.body.appendChild(link)
  
    try {
        link.click()
        clean(link)
        return true
    }
    catch (err) {
        clean(link)
        return err
    }
}