function marginSlider(){
    //Pega o ID do elemento e os elementos dentro dele
    var simpleSlider = document.getElementById('simple-slider');
    var img = Array.prototype.slice.call(simpleSlider.children);
    //cria a div que permite os elementos ficarem lado a lado
    var slider = document.createElement('div');
    slider.className = 'slider';
    //deixa a div no tamanho certo para todos os elementos
    slider.style.width = (simpleSlider.offsetWidth * img.length) + 'px';
    slider.style.height = simpleSlider.offsetHeight + 'px';
    //impede as imagens que não devem aparecer de aparecerem
    slider.style.overflow = 'hidden';
    simpleSlider.style.overflow = 'hidden';
    slider.style.overflow = 'hidden';
    simpleSlider.style.position = 'relative';

    //configura todos os botões
    var setDefaultButtons = function(next, prev, play){
        next.className = 'next';
        prev.className = 'prev';
        play.className = 'play';
        var btn = [next, prev, play];
        var setNextPrev = function(next, prev){
            var both = [next, prev];
            both.forEach(function(x){
                x.style.top = '47%';
                x.style.height = '7%';
                x.style.width = '7%';
                x.style.background = '#333';
                x.style.borderRadius = '80%';
                x.style.fontSize = '1.5em';
                x.style.paddingBottom = '6%';
                x.style.paddingRight = '6%';
            });
            next.style.right = '2%';
            next.innerHTML = '&rarr;';

            prev.style.left = '2%';
            prev.innerHTML = '&larr;';
            btn.forEach(function(x){
                x.style.position = 'absolute';
                x.style.zIndex = '1';
                x.style.border = '1px solid rgba(20,20,20,.5)';
                x.style.color = 'white';  
                x.style.opacity = '0.5';
                simpleSlider.appendChild(x); 
            });
        }

        setNextPrev(next, prev);  
        play.style.bottom = '3%';
        play.style.background = '#111';
        play.style.left = '45%';
        play.style.width = '10%';
        play.style.fontFamily = 'Impact, Charcoal, sans-serif';
        play.innerHTML = 'PLAY'; 
    };
    //cria os botoes do slider
    var play = document.createElement('button');
    var next = document.createElement('button');
    var prev = document.createElement('button');

    setDefaultButtons(next, prev, play);
    
    //configura as imagens
    var setImage = function(img){
        img.style.position = 'relative';
        img.style.top = '0';
        img.style.width = simpleSlider.offsetWidth + 'px';
        img.style.height = simpleSlider.offsetHeight + 'px';
        img.style.float = 'left';
        img.style.margin = '0';
        img.style.border = 'none';
        //adiciona as imagens no slider
        slider.appendChild(img);    
    };
    img.forEach(function(img){
        setImage(img);
    });
    //adiciona a div criada em simpleSlider
    simpleSlider.appendChild(slider);
    document.body.appendChild(simpleSlider);
    
    //rola infinitamente as imagens ao clicar em play
    var start = function(i){
        var interval = setInterval(function(){
            var stop = function(){
                clearInterval(interval);
            };
            //quando a margem é do tamanho do width do slider reposiciona ela pro final
            if(parseFloat(img[i].style.marginLeft) == - (simpleSlider.offsetWidth)){
                slider.appendChild(img[i]);
                setImage(img[i]);
                stop();
                if(i == img.length - 1){
                    i = 0;
                }
                else{
                    i++;
                }
                start(i);
            }
            //puxa a próxima imagem usando margem
            img[i].style.marginLeft = (parseFloat(img[i].style.marginLeft) - 1) + 'px';
        }, 1);
    };

    play.addEventListener('click', function(){
        if(play.innerHTML == 'PLAY'){
            start(0);
            play.innerHTML = 'STOP';
        }
    });
    
}

window.onload = marginSlider;