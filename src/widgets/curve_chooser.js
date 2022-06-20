
const curve_chooser =function(curve_storage, chooser_select){
    curve_storage.getCurveNames().forEach(function (key){
        var data = curve_storage.getCurve(key)
        var option = document.createElement('option');
        option.setAttribute('value', key);
        option.textContent = data.display;
        chooser_select.appendChild(option);
    })
}