/* Cria um slider que ao apertar play empurra as imagens usando margem, as imagens são posicionadas dentro de uma div (criada pela função), as imagens
 ficam lado a lado, porém a div só mostra o equivalente ao tamanho de uma foto. Quando uma foto some completamente do slider, ela é adicionada
 ao final do slider novamente, e é assim infinitamente para usar esse slider basta criar uma div com a classe 'simple-slider' e adicionar as imagens dentro
 IMPORTANTE: adicione um tamanho para a classe
  */
function marginSlider(){
    var simpleSlider = Array.prototype.slice.call(document.getElementsByClassName('simple-slider'));
    simpleSlider.forEach(function(simpleSlider){
        var img = Array.prototype.slice.call(simpleSlider.children);
        var slider = document.createElement('div');
        slider.className = 'slider';
        // Deixa a div no tamanho certo para todos os elementos
        slider.style.width = (simpleSlider.offsetWidth * img.length) + 'px';
        slider.style.height = simpleSlider.offsetHeight + 'px';
        simpleSlider.style.width = simpleSlider.offsetWidth + 'px';
        simpleSlider.style.height = simpleSlider.offsetHeight + 'px';
        //impede os elementos que não devem aparecer de aparecerem
        slider.style.overflow = 'hidden';
        simpleSlider.style.overflow = 'hidden';
        slider.style.overflow = 'hidden';
        simpleSlider.style.position = 'relative';

        // O botão play
        var play = document.createElement('button');
        play.className = 'play'; 
        play.style.bottom = '3%';
        play.style.background = '#111';
        play.style.left = '45%';
        play.style.width = simpleSlider.offsetWidth / 10;
        play.style.fontFamily = 'Impact, Charcoal, sans-serif';
        play.innerHTML = 'PLAY';
        play.style.position = 'absolute';
        play.style.zIndex = '1';
        play.style.border = '1px solid rgba(20,20,20,.5)';
        play.style.color = 'white';  
        play.style.opacity = '0.5';
        simpleSlider.appendChild(play);
        
        
        // Configura os elementos e adiciona no slider
        var setImage = function(img){
            img.style.position = 'relative';
            img.style.top = '0';
            img.style.width = simpleSlider.offsetWidth + 'px';
            img.style.height = simpleSlider.offsetHeight + 'px';
            img.style.float = 'left';
            img.style.margin = '0';
            img.style.border = 'none';
            slider.appendChild(img);    
        };
        img.forEach(function(img){
            setImage(img);
        });
        // Adiciona a div criada em simpleSlider
        simpleSlider.appendChild(slider);
        document.body.appendChild(simpleSlider);

        // Controla os elementos
        var imgCount = 0;

        var startSlider = function(){
            if(parseFloat(img[imgCount].style.marginLeft) == - (simpleSlider.offsetWidth)){
                slider.appendChild(img[imgCount]);
                setImage(img[imgCount]);
                if(imgCount == img.length - 1){
                    imgCount = 0;
                }
                else{
                    imgCount++;
                }
            }
            img[imgCount].style.marginLeft = (parseFloat(img[imgCount].style.marginLeft) - (simpleSlider.offsetWidth / 500)) + 'px';
        };
        var start;

        //configura o botão play e stop
        play.addEventListener('click', function(){
            if(play.innerHTML == 'PLAY'){
                play.innerHTML = 'STOP';
                start = setInterval(startSlider, 1);
            }
            else{
                play.innerHTML = 'PLAY';
                if(parseFloat(img[imgCount].style.marginLeft) != - (simpleSlider.offsetWidth) && parseFloat(img[imgCount].style.marginLeft) != 0){
                    if( - parseFloat(img[imgCount].style.marginLeft) < simpleSlider.offsetWidth / 1.5){
                        img[imgCount].style.marginLeft = '0';
                    }
                    else{
                        img[imgCount].style.marginLeft = - simpleSlider.offsetWidth;
                        slider.appendChild(img[imgCount]);
                        setImage(img[imgCount]);
                        if(imgCount == img.length - 1){
                            imgCount = 0;
                        }
                        else{
                            imgCount++;
                        }
                    }
                }
                clearInterval(start);
            }
        });
    });
}

window.onload = marginSlider;