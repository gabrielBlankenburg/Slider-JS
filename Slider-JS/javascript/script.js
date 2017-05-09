function teste(){
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

    //cria os botões prev e next
    var btnr = document.createElement('button');
    var btnl = document.createElement('button');
    btnr.className = 'next';
    btnl.className = 'prev';
    //posiciona e estiliza os botões
    btnr.style.position = 'absolute';
    btnl.style.position = 'absolute';
    btnr.style.zIndex = '1';
    btnl.style.zIndex = '1';
    btnr.style.top = '47%';
    btnl.style.top = '47%';
    btnr.style.right = '2%';
    btnl.style.left = '2%';
    btnr.style.height = '7%';
    btnr.style.width = '7%';
    btnl.style.width = '7%';
    btnl.style.height = '7%';
    btnr.style.color = 'white';
    btnl.style.color = 'white';

    btnr.style.background = '#333';
    btnr.style.opacity = '0.5';
    btnr.style.border = '1px solid rgba(20,20,20,.5)';
    btnr.style.borderRadius = '80%';
    btnr.innerHTML = '&rarr;';
    btnr.style.fontSize = '1.5em';
    btnr.style.paddingBottom = '6%';
    btnr.style.paddingRight = '6%';

    btnl.style.background = '#333';
    btnl.style.opacity = '0.5';
    btnl.style.border = '1px solid rgba(20,20,20,.5)';
    btnl.style.borderRadius = '80%'
    btnl.innerHTML = '&larr;';
    btnl.style.fontSize = '1.5em';
    btnl.style.paddingBottom = '6%';
    btnl.style.paddingRight = '6%';
    
    //adiciona os botões na página
    simpleSlider.appendChild(btnl);
    simpleSlider.appendChild(btnr);

    //cria o botão que começa e para o slider e o estiliza
    var btnc = document.createElement('button');
    btnc.className = 'play';
    btnc.style.position = 'absolute';
    btnc.style.bottom = '3%';
    btnc.style.background = '#111'
    btnc.style.border = '1px solid rgba(20,20,20,.5)';
    btnc.style.opacity = '.5';
    btnc.style.left = '45%';
    btnc.style.width = '10%';
    btnc.style.zIndex = '1';
    btnc.style.color = 'white';
    btnc.style.fontFamily = 'Impact, Charcoal, sans-serif';
    btnc.innerHTML = 'PLAY';


    simpleSlider.appendChild(btnc);
    
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
    
    //rola infinitamente as imagens
    var play = function(i){
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
                play(i);
            }
            //puxa a próxima imagem usando margem
            img[i].style.marginLeft = (parseFloat(img[i].style.marginLeft) - 1) + 'px';
        }, 1);
    };

    btnc.addEventListener('click', function(){
        if(btnc.innerHTML == 'PLAY'){
            play(0);
            btnc.innerHTML = 'STOP';
        }
    });
    //play(0);
    
}