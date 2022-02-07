let stopAnimation = false;

function AddClockInSliders()
{
  let AllSliders = [$('.slider1')[0], $('.slider2')[0], $('.slider3')[0]];

  $.ajax({
    method: 'POST',
    url: '/PHP_Scripts/GetClockBrand.php',
    success: function (arg) {
      arg = JSON.parse(arg);
      
      for (i = 0; i < arg.length; i++)
      {
        ClocksBox = $('.ClocksBox')[i];
        BrandClock = $('.BrandClock')[i];

        arg[i].forEach( (elem) => {

          BrandClock.innerText = elem[1];

          div = document.createElement('div');
          div.classList.add('Tovar');

          div.setAttribute('id', elem[2]);
      
          span = document.createElement('span');
          span.innerText = `${elem[1]}\n${elem[5]}\n${(+elem[10]).toLocaleString() + ' Руб'}`;
          
          img = document.createElement('img');
          img.src = elem[elem.length - 1];
          
          img.addEventListener('click', ShowClock);

          inp = document.createElement('input');
          inp.type = 'button';
          inp.value = 'В корзину';
          inp.addEventListener('click', AddTovarInKorzina)

          div.appendChild(img);
          div.appendChild(span);
          div.appendChild(inp);
          ClocksBox.appendChild(div);
        })

        list = ClocksBox.parentNode 
                        .parentNode
                        .childNodes;

        MoveButtons = Array.from(list).filter((elem) => {

          bool = elem.nodeName === 'DIV' &&
                 elem.classList.contains('LeftAndRightSlideButton');
          
          if (bool) return elem;
        })
        
        MoveButtons.forEach((elem) => {
          elem.addEventListener('click', MoveSlider);
        })
      }
    }
  })
}

function MoveSlider()
{
  if (stopAnimation === true) return;
  if (stopAnimation === false) stopAnimation = true;

  CurrentClocksBox = this.parentNode
                         .querySelector('.ShowCase')
                         .childNodes[1];

  ChildrensList = $(CurrentClocksBox).children();
  ClocksBoxMrgLeft = parseFloat( getComputedStyle(CurrentClocksBox).marginLeft );
  Pixels = 1158;

  function getValue()
  {
    checkStyle = parseFloat( getComputedStyle(CurrentClocksBox).marginLeft );
  }

  function toLeft()
  {
    if (ClocksBoxMrgLeft === 0) return;
    res = (ClocksBoxMrgLeft + Pixels) + 'px';
    TweenMax.to(CurrentClocksBox, 0.8, {marginLeft: res, onComplete: getValue});
  }

  function toRight()
  {
    res = (ClocksBoxMrgLeft - Pixels) + 'px';
    if (ClocksBoxMrgLeft === -4632) res = '0px';
    TweenMax.to(CurrentClocksBox, 0.8, {marginLeft: res, onComplete: getValue});
  }

  this.nextElementSibling === null ? toRight() : toLeft();
  setTimeout(() => {
    stopAnimation = false;
  }, 800)
}

AddClockInSliders();