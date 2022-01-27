let brandButton = $('.brandButton')[0],
    sortButton = $('.sortButton')[0],
    countButton = $('.countButton')[0],
    brandOpTop = parseFloat(getComputedStyle($('.brandOp')[0]).top),
    sortOpTop = parseFloat(getComputedStyle($('.sortOp')[0]).top),
    countOpTop = parseFloat(getComputedStyle($('.countOp')[0]).top),
    ArrClocks = [],
    brandOp = $('.brandOp')[0],
    next = $('.next')[0],
    back = $('.back')[0],
    currentVitrina,
    sortClocksArr = [],
    ClockLength = 50,
    log = console.log,
    sortOp = $('.sortOp')[0],
    countOp = $('.countOp')[0],
    VitrinaContent = $('.VitrinaContent')[0],
    sortCritObj = {count: '', brand: '', sort: ''},
    AcceptAndDeleteFilter = $('.AcceptAndDeleteFilter')[0],
    DeleteFilter = $('.DeleteFilter')[0],
    ClearFilter = $('.ClearFilter')[0],
    AcceptFilter = $('.AcceptFilter')[0],
    MenuFilter = $('.MenuFilter')[0],
    ClickAcceptButton = false,
    mouseenter = false,
    CheckFilter = $('.CheckFilter')[0];


function AddEvent()
{
  sortButton.addEventListener('mouseenter', OpenAndCloseOptions);
  sortButton.parentNode.addEventListener('mouseleave', OpenAndCloseOptions);

  brandButton.addEventListener('mouseenter', OpenAndCloseOptions);
  brandButton.parentNode.addEventListener('mouseleave', OpenAndCloseOptions);

  countButton.addEventListener('mouseenter', OpenAndCloseOptions);
  countButton.parentNode.addEventListener('mouseleave', OpenAndCloseOptions);

  next.addEventListener('click', UpdateVitrinaFunc);
  back.addEventListener('click', UpdateVitrinaFunc);

  for (let i = 0; i < sortOp.children.length; i++)
  {
    sortOp.children[i].addEventListener('click', AddFilter);
  }

  for (let i = 0; i < countOp.children.length; i++)
  {
    countOp.children[i].addEventListener('click', AddFilter);
  }

}

function OpenAndCloseOptions()
{
  checkClass = event.target.classList;
  
  if (event.type === 'mouseenter')
  {
    currentDiv = $(this.nextElementSibling).children()[0];
    mouseenter = true;

    if ( checkClass.contains('brandButton') ) TweenMax.to(currentDiv, 0.9, {top: '0rem'});
    if ( checkClass.contains('sortButton') ) TweenMax.to(currentDiv, 0.5, {top: '0rem'});
    if ( checkClass.contains('countButton') ) TweenMax.to(currentDiv, 0.5, {top: '0rem'});
  }

  if (event.type === 'mouseleave')
  {
    h3_elem = $(this).children()[0];
    currentDivH3 = $(currentDiv.parentNode.parentNode).children()[0];

    if (h3_elem !== currentDivH3 || !mouseenter) return;

    if ( checkClass.contains('brandSelect') ) TweenMax.to(currentDiv, 0.9, {top: brandOpTop});
    if ( checkClass.contains('sortSelect') ) TweenMax.to(currentDiv, 0.5, {top: sortOpTop});
    if ( checkClass.contains('countSelect') ) TweenMax.to(currentDiv, 0.5, {top: countOpTop});

    mouseenter = false;
  }
}

function brandsSelectFunc()
{
  $.ajax({
    method: "POST",
    url: '/PHP_Scripts/GetAllBrands.php',
    success: function (arg) {
      arg = JSON.parse(arg);
      arg = arg.map((arr) => {
        return arr[arr.length - 1];
      })


      currentDiv = $(brandButton.nextElementSibling).children()[0];
      
      for (i = 0; i < arg.length; i++)
      {
        h5 = document.createElement('h5');
        h5.innerText = arg[i];
        h5.addEventListener('click', AddFilter);

        currentDiv.appendChild(h5);
      }
    }
  })
}

function AllTovary()
{
  
  $.ajax({
    method: "POST",
    url: '/PHP_Scripts/getClock.php',
    success: function (arg) {
      arg = JSON.parse(arg);
      ArrClocks = [...arg];

      Rows = Math.ceil(ArrClocks[0].length / 4);

      GridTemplateAreasStr = '';
      GridTemplateAreasStr = '". . . ."\n '.repeat(Rows);
      GridTemplateAreasStr = GridTemplateAreasStr.slice(0, GridTemplateAreasStr.lastIndexOf('\n'));
      
      if (ArrClocks.length > 1) next.style.visibility = 'visible';

      RenderFunc(ArrClocks[0]);
      currentVitrina = ArrClocks[0];
      }
    })
}

function RenderFunc(arg)
{
  GridTemplateAreasStr = '". . . ."\n'.repeat(Rows);
  GridTemplateAreasStr = GridTemplateAreasStr.slice(0, GridTemplateAreasStr.lastIndexOf('\n'));

  for (let i = 0; i < arg.length; i++)
  {
    CurrentClock = arg[i];

    GridTemplateAreasStr = GridTemplateAreasStr.replace('.', `Clock${i + 1}`);
        

    div = document.createElement('div');
    img = document.createElement('img');
    span = document.createElement('span');
    inp = document.createElement('input');

    price = parseFloat(CurrentClock[10]).toLocaleString() + " Руб";

    div.classList.add('VitrinaTovar');
    img.src = CurrentClock[CurrentClock.length - 1];
    span.innerText = `${CurrentClock[1]}\n${CurrentClock[5]}\n${price}`;

    img.addEventListener('click', ShowClock);

    inp.type = 'button';
    inp.value = 'В корзину';
    inp.addEventListener('click', AddTovarInKorzina);

    div.style.gridArea = `Clock${i + 1}`;
        
    div.appendChild(img);
    div.appendChild(span);
    div.appendChild(inp);
        
    VitrinaContent.appendChild(div);
  }

  VitrinaContent.style.gridTemplateAreas = GridTemplateAreasStr;
}

function MoveVitrinaFunc(arg)
{
  
  if (event.target.classList[0] === 'next')
  {
    let ind = arg.indexOf(currentVitrina) + 1;

    if (arg[ind - 2] === undefined) back.style.visibility = 'visible';
    if (arg[ind + 1] === undefined)
    {
      next.style.visibility = 'hidden';
      back.style.marginLeft = '7rem';
    }

    currentVitrina = arg[ind];
    VitrinaContent.innerHTML = '';

    Rows = Math.ceil(currentVitrina.length / 4);
    RenderFunc(currentVitrina);
    window.scrollTo(0, 1970);
  }
  else 
  {
    let ind = arg.indexOf(currentVitrina) - 1;

    if (arg[ind - 1] === undefined)
    {
      back.style.visibility = 'hidden';
      back.style.marginLeft = '1rem';

      if (next.style.visibility === 'hidden') next.style.visibility = 'visible';
    }

    currentVitrina = arg[ind];
    VitrinaContent.innerHTML = '';

    Rows = Math.ceil(currentVitrina.length / 4);
    RenderFunc(currentVitrina);
    window.scrollTo(0, 1970);
  }

  //window.scrollTo(0, 1970);
}

function UpdateVitrinaFunc()
{
  sortClocksArr.length === 0 ? MoveVitrinaFunc(ArrClocks) : 
                               MoveVitrinaFunc(sortClocksArr);
}

function AddFilter()
{
  let CheckParent = this.parentNode.classList[0],
      CheckFilterTxt;

  if ( getComputedStyle(MenuFilter).opacity === '0' )
  {
    MenuFilter.style.opacity = '100%';

    AcceptFilter.addEventListener('click', sortVitrinaFunc);
    DeleteFilter.addEventListener('click', Delete_Filter);
    ClearFilter.addEventListener('click', Clear_Filter);
    
    AcceptFilter.style.cursor = 'pointer';
    DeleteFilter.style.cursor = 'pointer';
    ClearFilter.style.cursor = 'pointer';
  }

  CheckFilterTxt = CheckFilter.innerText;

  for (i in sortCritObj)
  {
  
    if (this.innerText === sortCritObj[i])
    {
      if (ClickAcceptButton)
      {
        ClickAcceptButton = false;
        return;
      }

      CheckFilter.innerText = CheckFilterTxt.replace(sortCritObj[i] + ';', '');
      sortCritObj[i] = '';
      
      CheckValuesObj = Object.values(sortCritObj);

      if (CheckValuesObj.length === CheckValuesObj.filter(elem => elem === '').length)
      {
        MenuFilter.style.opacity = '0%';

        AcceptFilter.removeEventListener('click', sortVitrinaFunc);
        DeleteFilter.removeEventListener('click', Delete_Filter);

        AcceptFilter.style.cursor = 'default';
        DeleteFilter.style.cursor = 'default';
        ClearFilter.style.cursor = 'default';
      }

      return;
    }
  }

  if (CheckParent === 'countOp')
  {
    if (sortCritObj.count !== '')
    {
      CheckFilter.innerText = CheckFilterTxt.replace(sortCritObj.count, this.innerText);
      sortCritObj.count = this.innerText;
      return;
    }

    sortCritObj.count = this.innerText;
  }

  if (CheckParent === 'brandOp')
  {
    if (sortCritObj.brand !== '')
    {
      CheckFilter.innerText = CheckFilterTxt.replace(sortCritObj.brand, this.innerText);
      sortCritObj.brand = this.innerText;
      return;
    }

    sortCritObj.brand = this.innerText;
  }

  if (CheckParent === 'sortOp')
  {
    if (sortCritObj.sort !== '')
    {
      CheckFilter.innerText = CheckFilterTxt.replace(sortCritObj.sort, this.innerText);
      sortCritObj.sort = this.innerText;
      return;
    }

    sortCritObj.sort = this.innerText;
  }

  CheckFilter.innerText = CheckFilter.innerText + ` ${this.innerText};`;
}

function Delete_Filter()
{
  Clear_Filter();

  sortClocksArr.length = 0;

  MenuFilter.style.opacity = '0%';

  AcceptFilter.removeEventListener('click', sortVitrinaFunc);
  DeleteFilter.removeEventListener('click', Delete_Filter);
  ClearFilter.removeEventListener('click', Clear_Filter);

  AcceptFilter.style.cursor = 'default';
  DeleteFilter.style.cursor = 'default';
  ClearFilter.style.cursor = 'default';

  if (back.style.visibility === 'visible') back.style.visibility = 'hidden';
  if (next.style.visibility === 'visible') next.style.visibility = 'hidden';
  if (ArrClocks.length > 1) next.style.visibility = 'visible';

  VitrinaContent.innerHTML = '';
  currentVitrina = ArrClocks[0];

  Rows = Math.ceil(ArrClocks[0].length / 4);
  RenderFunc(ArrClocks[0]);
}

function Clear_Filter()
{
  let CheckFilterTxt = CheckFilter.innerText;

  for (i in sortCritObj) sortCritObj[i] = '';

  CheckFilter.innerText = CheckFilterTxt.slice(0, CheckFilterTxt.indexOf(':') + 1);
}

function sortVitrinaFunc()
{
  if ( parseFloat(back.style.marginLeft) !== 1 ) back.style.marginLeft = '1rem';

  MenuFilter.style.opacity = '0%';
  sortClocksArr = [...ArrClocks];

  sortClocksArr.slice(1).forEach((elem) => {
    sortClocksArr[0] = sortClocksArr[0].concat(elem);
  })

  sortClocksArr = sortClocksArr[0];

  AcceptFilter.removeEventListener('click', sortVitrinaFunc);
  DeleteFilter.removeEventListener('click', Delete_Filter);

  AcceptFilter.style.cursor = 'default';
  DeleteFilter.style.cursor = 'default';
  ClearFilter.style.cursor = 'default';

  if (sortCritObj.brand !== '') Brand();

  sortCritObj.count === '' ? Count() : Count( parseInt(sortCritObj.count) );

  if (sortCritObj.sort !== '') Sort();

  function Count(len = 50)
  {
    iter = Math.ceil(sortClocksArr.length / len);
    i = 0;
    
    if (sortClocksArr.length < len)
    {
      while (sortClocksArr.length < len)
      {
        if (len === 50) break;
        len -= 50;
      }

      iter = Math.ceil(sortClocksArr.length / len);
    }

    while (i < iter)
    {
      boof = sortClocksArr.splice(i, len, '');
      sortClocksArr.splice(sortClocksArr.indexOf(''), 1, boof);
      i++;
    }
  }

  function Brand()
  {
    sortClocksArr = sortClocksArr.filter( elem => elem[1].includes(sortCritObj.brand) );
  }

  function Sort()
  {
    if ( sortCritObj.sort.startsWith('Возрастанию') )
    {
      for (let i = 0; i < sortClocksArr.length; i++)
      {
        sortClocksArr[i] = sortClocksArr[i].sort((a, b) => {
          if (+a[10] > +b[10]) return 1;
          if (+a[10] < +b[10]) return -1;
          if (+a[10] === +b[10]) return 0;
        })
      }
    }

    if ( sortCritObj.sort.startsWith('Убыванию') )
    {
      for (let i = 0; i < sortClocksArr.length; i++)
      {
        sortClocksArr[i] = sortClocksArr[i].sort((a, b) => {
          if (+a[10] > +b[10]) return -1;
          if (+a[10] < +b[10]) return 1;
          if (+a[10] === +b[10]) return 0;
        })
      }
    }
  }

  ClickAcceptButton = true;
  VitrinaContent.innerHTML = '';

  currentVitrina = sortClocksArr[0];

  if (back.style.visibility === 'visible') back.style.visibility = 'hidden';
  if (next.style.visibility === 'visible') next.style.visibility = 'hidden';
  if (sortClocksArr.length > 1) next.style.visibility = 'visible';
  
  Rows = Math.ceil(sortClocksArr[0].length / 4);
  RenderFunc(sortClocksArr[0]);
}

AddEvent();
AllTovary();
brandsSelectFunc();