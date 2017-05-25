// Ao clicar no botão Criar Slider, cria o slider de acordo com a opção escolhida
$(document).ready(function(){
    $('#filter').click(function(){
        $('.category').css('display', 'block'); 
    });
    $('#random').click(function(){
        $('.category').css('display', 'none');
    });
    $('#submit').click(function(){
        if($('.category').css('display') == 'block'){
            if($('#form input').val() == ''){
                alert('insira a categoria desejada');
            }
            else{
                randomImage($('#sliderChoice').val(), $('#form input').val());
            }
        }
        else{
            randomImage($('#sliderChoice').val(), '');
        }
    });
});

//Pega uma imagem aleatoria da categoria escolhida, se a imagem for completamente aleatoria, a categoria escolhida é procurada como nula
function randomImage (sliderType, search){
    $.getJSON(
        'https://pixabay.com/api/?key='+key()+'&q='+search+'&image_type=photo&per_page=200&safesearch=true',
        function(data){
            if(data.hits.length < 1) alert('Nenhuma Imagem encontrada');
            else{
                $('#sliders').empty();
                var slider = $('#sliderChoice').val();
                $('#sliders').append('<div class="'+slider+'"></div>');
                $('#sliders .'+slider).append(setNImages($('#nImg').val(), '', data));
                var setSlider = function(slider){
                    $('.'+slider).css('width', '500px').css('height', '500px').css('text-align','left');
                };
                setSlider(slider);
                if(slider == 'simple-slider') simpleSlider();
                else if(slider == 'margin-slider') marginSlider();
                else if(slider == 'fadeIn') fadeIn();
            }
        }
    )
}

// Usa recursividade pra criar o número de imagens escolhida
function setNImages (n, str, data){
    str = str + '<img src="' + chooseRandomImage(data) +'">';
    if(n == 1) return str;
    else return setNImages(n-1, str, data);
}

// Retorna uma imagem aleatoria do resultado
function chooseRandomImage (data){
    var randomNumber = function (min,max){
        return Math.floor(Math.random()*(max-min+1)+min);
    }
    return data.hits[randomNumber(0, (data.hits.length - 1))].webformatURL;
}