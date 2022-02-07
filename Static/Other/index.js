var ShowBacket = $('.ShowBacket')[0],
    wrapper = $('.wrapper')[0],
    TovarBox = $('.TovarBox')[0],
    TovarBoxHeader = TovarBox.children[0],
    TovarBoxContent = TovarBox.children[1],
    TovarBoxFooter = TovarBox.children[2],
    buttonWrapper = TovarBoxFooter.children[0],
    CommentWindow = $('.CommentWindow')[0],
    WriteCommentDiv = $('.WriteCommentDiv')[0],
    Stars = Array.from($('.Star')),
    checkClickOnStars = false,
    commentDiv = $('.CommentDiv')[0],
    id_clock,
    id_clocks,
    LeftArrow = $('.LeftArrow')[0],
    RightArrow = $('.RightArrow')[0],
    CommentButtonsInd,
    currentInd,
    ArrCommentId,
    Korzina_Buttons,
    closeInput = TovarBox.children[0].lastElementChild;
    

TovarBoxFooter.querySelector('input[value="В корзину"]')
              .addEventListener('click', AddTovarInKorzina);

function CheckButton(buttonClock)
{
  F_str = CheckButton.caller.name;

  if (F_str === 'ShowClock')
  {
    bool = buttonClock.style.backgroundColor = 'green' &&
           buttonClock.value === 'В корзине';

    if (bool)
    {
      buttonWrapper.style.backgroundColor = 'green';
      buttonWrapper.style.cursor = 'default';
      buttonWrapper.value = 'В корзине';
      buttonWrapper.removeEventListener('click', AddTovarInKorzina);
    }
  }
  else 
  {
    if ( buttonWrapper.style.backgroundColor === 'green' )
    {
      setTimeout(() => {
        buttonWrapper.style.backgroundColor = '';
        buttonWrapper.style.cursor = 'pointer';
        buttonWrapper.value = 'В корзину';
        buttonWrapper.addEventListener('click', AddTovarInKorzina);
      }, 800)
    }
  }
}

function ShowClock()
{
  let TovarDivChildrens = event.target.parentNode.children,
      DivSpanTxt = TovarDivChildrens[1].innerText,
      [Model, Price] = (DivSpanTxt.replace('\n', ' ')).split('\n'),
      Inf = $('.Inf')[0];

  id_clock = event.target.parentNode.getAttribute('id');

  CheckButton(this.parentNode.querySelector('input'));

  wrapper.style.visibility = 'visible';
  wrapper.style.opacity = '100%';

  TovarBoxContent.children[0].src = TovarDivChildrens[0].src;
  TovarBoxContent.children[1].children[0].textContent = Model;
  TovarBoxContent.children[1].children[2].textContent = Price;

  $.ajax({
    method: 'POST',
    data: {id_clock: id_clock},
    url: '/PHP_Scripts/GetClockInfo.php',

    success: function (arg) {
      arg = JSON.parse(arg);
      arg[3] = `Стекло: ${arg[3]}`;

      arg = arg.join(', ');
      
      TovarBoxContent.children[1].children[1].textContent = arg;
      CheckCount(ShowClock);
    }
  })

  Korzina_Buttons = $('input[value="В корзину"]')[0];
}

function MoveComments()
{
  let first = CommentButtonsInd[0],
      last = CommentButtonsInd[CommentButtonsInd.length - 1];

  if (currentInd === undefined) currentInd = first;

  if (this.classList[0] === 'RightArrow' && currentInd !== last) currentInd++;
  if (this.classList[0] === 'LeftArrow' && currentInd !== first) currentInd--;

  if (currentInd === last) this.style.visibility = 'hidden';
  if (currentInd + 1 === last) this.nextElementSibling.style.visibility = 'visible';

  if (currentInd - 1 === first) this.previousElementSibling.style.visibility = 'visible';
  if (currentInd === first) this.style.visibility = 'hidden';

  TovarBox.scrollTo(0, 620);
  commentDiv.innerHTML = '';
  GetComment(currentInd);
}

function hiddenWrapper()
{
  let currentClass = Array.from(event.target.classList);
  
  if ( !currentClass.includes('wrapper') && !currentClass.includes('CloseButtonTovarBox') ) return;
  
  wrapper.style.opacity = '0%';
  wrapper.style.visibility = 'hidden';

  commentDiv.innerHTML = '';
  CommentButtonsInd.length = 0;
  CheckButton();

  if (ArrCommentId?.length !== 0 && ArrCommentId !== undefined) ArrCommentId.length = 0;

  CommentWindow.value = '';
  
  Stars.forEach((elem) => {
    elem.style.color = '';
  })

  TovarBox.scrollTo(0, 0);
}

function checkWindow()
{
  let val = +CommentWindow.getAttribute('rows');
  CommentWindow.setAttribute('rows', ++val);
}

function ClearButton()
{
  CommentWindow.value = '';
  if ( +CommentWindow.getAttribute('rows') > 2 ) CommentWindow.setAttribute('rows', 2);
}

function EnterLeaveStars()
{
  if (event.type === 'mouseenter')
  {
    let StarIndex = Stars.indexOf(event.target);

    while (StarIndex >= 0)
    {
      Stars[StarIndex].style.color = 'goldenrod';
      StarIndex--;
    }
  }

  if (event.type === 'mouseleave')
  {
    Stars.forEach((elem) => {
      elem.style.color = '';
    })
  }
}

function ClickOnStar()
{
  if ( !checkClickOnStars )
  {
    Stars.forEach((elem) => {
      elem.removeEventListener('mouseenter', EnterLeaveStars);
      elem.removeEventListener('mouseleave', EnterLeaveStars);
    })

    checkClickOnStars = true;
  }
  else 
  {
    let goldenStarsLen = Stars.filter(elem => elem.style.color === 'goldenrod').length - 1,
        currentStarsIndex = Stars.indexOf(event.target);

    if (currentStarsIndex === goldenStarsLen)
    {
      i = 0;

      while (i <= currentStarsIndex)
      {
        Stars[i].style.color = '';
        i++;
      }

      checkClickOnStars = false;
      
      Stars.forEach((elem) => {
        elem.addEventListener('mouseenter', EnterLeaveStars);
        elem.addEventListener('mouseleave', EnterLeaveStars);
      })
    }

    if (currentStarsIndex > goldenStarsLen)
    {
      goldenStarsLen++;

      while (goldenStarsLen <= currentStarsIndex)
      {
        Stars[goldenStarsLen].style.color = 'goldenrod';
        goldenStarsLen++;
      }

      return;
    }

    if (currentStarsIndex < goldenStarsLen)
    {
      currentStarsIndex++;

      while (currentStarsIndex <= goldenStarsLen)
      {
        Stars[currentStarsIndex].style.color = '';
        currentStarsIndex++;
      }

      return;
    }
  }
}

function CheckCount(callerFunc)
{
  $.ajax({
    method: "POST",
    url: "/PHP_Scripts/GetComment.php",
    data: {Count: true, id_clock: id_clock},
    success: function (arg) {
      arg = JSON.parse(arg);
      CommentButtonsInd = [...arg];
      Count = CommentButtonsInd.pop();
      
      if (callerFunc === AddComment) return;

      $('.countComments')[0].nextElementSibling.innerText = Count;

      if (CommentButtonsInd.length > 1) RightArrow.style.visibility = 'visible';

      GetComment(+CommentButtonsInd[0]);
    }
  })
}

function GetCookieMark()
{
  arr_cookies = document.cookie.split('; ');
  current_cookie_str = arr_cookies.find(elem => elem.includes('LikesAndDislikesArr'));
  current_cookie_value = JSON.parse(current_cookie_str.slice(current_cookie_str.indexOf('=') + 1));

  return current_cookie_value;
}

function UpdateMark()
{
  let CommentDivChildrens = Array.from(commentDiv.children),
      CheckNextOrPrev = false,
      current_cookie_arr,
      CurrentElem = event.currentTarget,
      DelElemCookieOrCookie = false,
      CurrentUserComment = this.parentNode.parentNode,
      CurrentCommentId = ArrCommentId[CommentDivChildrens.indexOf(CurrentUserComment)],
      MarkValue = this.nextElementSibling,
      dat = new Date(),
      msc = 1000 * 60 * 60 * 24 * 14,
      CheckMark = this.classList[0];

  dat.setTime(dat.getTime() + msc);
  GMTSTR = dat.toGMTString();

  if ( document.cookie.includes('LikesAndDislikesArr') ) current_cookie_arr = GetCookieMark()
  
  if (current_cookie_arr !== undefined)
  {
    find_arr = current_cookie_arr.find(elem => elem.includes(CurrentCommentId));
  }

  if (CurrentElem.style.backgroundColor === '')
  {

    if (CheckMark === 'Dislike')
    {
      prev_elem = CurrentElem.previousElementSibling.previousElementSibling;
      prev_elem_value = prev_elem.nextElementSibling;

      if (prev_elem.style.backgroundColor === 'green')
      {
        
        if ( find_arr.length !== 0 )
        {
          ind = current_cookie_arr.indexOf(find_arr);
          find_arr[1] = 'Dislike';
          current_cookie_arr.splice(ind, 1, find_arr);
          document.cookie = `LikesAndDislikesArr=${JSON.stringify(current_cookie_arr)}; expires=${GMTSTR}`;
        }

        prev_elem.style.backgroundColor = '';
        prev_elem_value.innerText = +prev_elem_value.innerText - 1
        CheckNextOrPrev = prev_elem_value.innerText;
      }
    }
    else 
    {
      next_elem = CurrentElem.nextElementSibling.nextElementSibling;
      next_elem_value = next_elem.nextElementSibling;

      if (next_elem.style.backgroundColor === 'red')
      {
        if ( find_arr.length !== 0 )
        {
          ind = current_cookie_arr.indexOf(find_arr);
          find_arr[1] = 'Like';
          current_cookie_arr.splice(ind, 1, find_arr);
          document.cookie = `LikesAndDislikesArr=${JSON.stringify(current_cookie_arr)}; expires=${GMTSTR}`;
        }

        next_elem.style.backgroundColor = '';
        next_elem_value.innerText = +next_elem_value.innerText - 1;
        CheckNextOrPrev = next_elem_value.innerText;
      }
    }

    MarkValue.innerText = +MarkValue.innerText + 1;
  }
  else 
  {
    if ( find_arr.length !== 0 )
    {
      ind = current_cookie_arr.indexOf(find_arr);
      current_cookie_arr.splice(ind, 1, '');
      current_cookie_arr = current_cookie_arr.filter(elem => elem !== '');

      DelElemCookieOrCookie = true;

      if (current_cookie_arr.length !== 0)
      {
        document.cookie = `LikesAndDislikesArr=${JSON.stringify(current_cookie_arr)}; expires=${GMTSTR}`;
      }
      else 
      {
        document.cookie = "LikesAndDislikesArr=;max-age=-1;";
      }
    }


    MarkValue.innerText = +MarkValue.innerText - 1;
  }

  $.ajax({
    method: "POST",
    url: '/PHP_Scripts/UpdateMark.php',
    data: {
      CheckMark: CheckMark, 
      CommentId: CurrentCommentId, 
      Value: MarkValue.innerText,
      ValueTwo: CheckNextOrPrev 
    },

    success: function (arg) {
      CurrentElem.style.backgroundColor !== '' ?
        CurrentElem.style.backgroundColor = '' :
        CurrentElem.style.backgroundColor = arg;

      if (DelElemCookieOrCookie)
      {
        DelElemCookieOrCookie = false;
      }
      else 
      {

        if ( !document.cookie.includes('LikesAndDislikesArr') )
        {
          document.cookie = `LikesAndDislikesArr=[[${CurrentCommentId}, "${CheckMark}"]]; expires=${GMTSTR}`;
        }
        else 
        {
          current_cookie_arr = GetCookieMark();

          if ( current_cookie_value.find(elem => elem.includes(+CurrentCommentId)) ) return;

          current_cookie_arr.push([CurrentCommentId, CheckMark]);
          current_cookie_arr = JSON.stringify(current_cookie_arr);

          document.cookie = `LikesAndDislikesArr=${current_cookie_arr}; expires=${GMTSTR}`;
        }
      }
    }
  })

}

function RenderComment()
{
  UserComment = document.createElement('div');
  UserCommentHeader = document.createElement('div');
  UserCommentContent = document.createElement('div');
  UserCommentFooter = document.createElement('div');
  DateDiv = document.createElement('div');
  StarsDiv = document.createElement('div');
  UserName = document.createElement('h4');
  CommentTxt = document.createElement('h5');
  LikeButton = document.createElement('div');
  DislikeButton = document.createElement('div');
  DateAddh5 = document.createElement('h5');
  h4Like = document.createElement('h4');
  h4Dislike = document.createElement('h4');
  LikeValue = document.createElement('h5');
  DislikeValue = document.createElement('h5');
  OpenThreadesButton = document.createElement('input');
    


  UserComment.classList.add('UserComment');
  UserCommentHeader.classList.add('UserCommentHeader');
  UserCommentContent.classList.add('UserCommentContent');
  UserCommentFooter.classList.add('UserCommentFooter');
  UserName.classList.add('UserName');
  StarsDiv.classList.add('StarsDiv');
  LikeButton.classList.add('Like');
  LikeValue.classList.add('LikeValue');
  DislikeButton.classList.add('Dislike');
  DislikeValue.classList.add('DislikeValue');
  OpenThreadesButton.classList.add('OpenThreades');
  DateDiv.classList.add('DateDiv')
  DateAddh5.classList.add('DateH5')

    
  UserName.innerText = userComment;
   CommentTxt.innerText = comment;
  LikeValue.innerText = likes;
  DislikeValue.innerText = dislikes;
  DateAddh5.innerText = date_add;

  OpenThreadesButton.value = 'Открыть комментарии';

  OpenThreadesButton.type = 'button';
  OpenThreadesButton.classList.add('OpenThreades')

  UserCommentHeader.appendChild(UserName);
  UserCommentHeader.appendChild(StarsDiv);

  UserCommentContent.appendChild(CommentTxt);

  h4Like.innerText = '+';
  h4Dislike.innerText = '-';

  LikeButton.appendChild(h4Like);
  DislikeButton.appendChild(h4Dislike);

  LikeButton.addEventListener('click', UpdateMark);
  DislikeButton.addEventListener('click', UpdateMark);

  UserCommentFooter.appendChild(LikeButton);
  UserCommentFooter.appendChild(LikeValue);
  UserCommentFooter.appendChild(DislikeButton);
  UserCommentFooter.appendChild(DislikeValue);
  UserCommentFooter.appendChild(OpenThreadesButton);
    
  DateDiv.appendChild(DateAddh5);
    
   UserComment.appendChild(UserCommentHeader);
  UserComment.appendChild(UserCommentContent);
  UserComment.appendChild(UserCommentFooter);
  UserComment.appendChild(DateDiv);

  m = 1;


  while (m <= 5) {
    Star = document.createElement('h3');
    Star.innerText = '★';
    Star.classList.add('CommentStar')

    if (m === 5) Star.style.marginRight = '-5rem';

    if (m <= +mark) Star.style.color = 'goldenrod';
      

    StarsDiv.appendChild(Star); 
    m++;
  }

  return UserComment;
}

function CheckUserCookie()
{
  bool = document.cookie.includes('LikesAndDislikesArr');

  if (bool)
  {
    let current_cookie_arr = document.cookie.split('; '),
        current_cookie = current_cookie_arr.find(elem => elem.includes('LikesAndDislikesArr')),
        current_cookie_value = JSON.parse(current_cookie.slice(current_cookie.indexOf('=') + 1)),
        m = 0;
      
    while (m < current_cookie_value.length)
    {
      index_elem = ArrCommentId.indexOf(current_cookie_value[m][0]);

      if (index_elem !== -1)
      {
        current_elem = commentDiv.children[index_elem];
        getMark = current_cookie_value[m][1];
          
        if (getMark === 'Like')
        {
          getMarkButton = current_elem.querySelector(`.${getMark}`);
          getMarkButton.style.backgroundColor = 'green';
        }
        else
        {
          getMarkButton = current_elem.querySelector(`.${getMark}`);
          getMarkButton.style.backgroundColor = 'red';
        }
      }

      m++;
    }
  }
}

function GetComment(offset)
{
  if ( isNaN(offset) ) return;

  $.ajax({
    method: 'POST',
    url: '/PHP_Scripts/GetComment.php',
    data: {id_clock: id_clock, offset: offset},
    success: function (arg) {
      
      arg = JSON.parse(arg);
      
      if (ArrCommentId === undefined) ArrCommentId = [];

      for (i = 0; i < arg.length; i++)
      {
        [comment, mark, date_add, likes, dislikes, userComment] = arg[i];

        if (userComment === null) userComment = userComment ?? 'Аноним';

        commentDiv.appendChild(RenderComment());
        ArrCommentId.push(+arg[i][arg[i].length - 1]);
      }

      CheckUserCookie();
    }
  })
}

function AddComment()
{
  let WarningTxt = $('.TextWarning')[0],
      WindowText = $('.CommentWindow')[0],
      StarsCount = Stars.filter(elem => elem.style.color === 'goldenrod').length;

  WarningTxt.style.opacity = '100%';

  if (WindowText.value.length === 0)
  {
    WarningTxt.innerText = 'Вы ничего не ввели!';
    return;
  }

  if (StarsCount === 0)
  {
    WarningTxt.innerText = 'Пожалуйста дайте оценку товару!';
    return;
  }

  question = confirm('Вы уверены?');

  if ( !question ) return;

  $.ajax({
    method: 'POST',
    url: '/PHP_Scripts/AddComment.php',
    data: {
      id_clock: id_clock,
      comment: WindowText.value, 
      mark: StarsCount
    },
    success: function (arg) {
      arg = JSON.parse(arg);

      [userComment, mark, date_add, comment] = arg;
      mark = +mark;
      likes = 0;
      dislikes = 0;
      
      if ( Array.isArray(ArrCommentId) )
      {
        ArrCommentId.push(arg[arg.length - 1]);
      }
      else 
      {
        ArrCommentId = [];
        ArrCommentId.push(arg[arg.length - 1]);
      }

      if ( commentDiv.children.length === 25 )
      {
        old_child = commentDiv.lastElementChild;
        commentDiv.replaceChild(RenderComment(), old_child);

        if ( getComputedStyle(RightArrow).visibility === 'hidden' )
        {
          RightArrow.style.visibility = 'visible';
        }

        CheckCount(AddComment);
      }
      else 
      {
        commentDiv.appendChild(RenderComment());
      }

    }
  })

  Stars.forEach((elem) => {
    elem.style.color = '';
  })

  WindowText.value = '';
  countValue = +($('.countComments')[0].nextElementSibling.innerText);
  $('.countComments')[0].nextElementSibling
                        .innerText = countValue + 1;
}

function AddTovarInKorzina()
{
  id_clock = event.target.parentNode.getAttribute('id');

  $.ajax({
    method: "POST",
    url: '/PHP_Scripts/AddTovar.php',
    data: {id_clock: id_clock},
    success (arg) {
      console.log(arg);
    }
  })

  this.value = 'В корзине';
  this.style.backgroundColor = 'green';
  this.style.cursor = 'default';
  this.removeEventListener('click', AddTovarInKorzina);
}

function AddEvent()
{
  ShowBacket.addEventListener('click', () => {
    location.href = '/Modules/Shop/backet/backet_user.php';
  })

  CommentWindow.addEventListener('scroll', checkWindow);
  CommentWindow.addEventListener('keydown', () => {

    let Rows = CommentWindow.getAttribute('rows');

    if (event.key === 'Backspace' && event.target.value.length === 1 && Rows > 2)
    {
      CommentWindow.setAttribute('rows', 2);
    }

  })

  LeftArrow.addEventListener('click', MoveComments);
  RightArrow.addEventListener('click', MoveComments);

  Stars.forEach((elem) => {
    elem.addEventListener('mouseenter', EnterLeaveStars);
    elem.addEventListener('mouseleave', EnterLeaveStars);
    elem.addEventListener('click', ClickOnStar)
  })

  $('input[value = "Очистить"]')[0].addEventListener('click', ClearButton);
  $('input[value = "Подтвердить"]')[0].addEventListener('click', AddComment);
  wrapper.addEventListener('mousedown', hiddenWrapper);
}

function CheckUserTovarInKorzina()
{
  function StartTimer()
  {
    setTimeout(() => {
      current_clocks = id_clocks.filter(elem => $(`#${elem}`)[0]?.nodeName === 'DIV');

      for (let i = 0; i < current_clocks.length; i++) {
        current_input = [...$('input[value="В корзину"]')].filter(
          elem => elem.parentNode.id === current_clocks[i]
        )

        current_input.forEach((elem) => {
          elem.value = 'В корзине';
          elem.style.backgroundColor = 'green';
          elem.style.cursor = 'default';
          elem.removeEventListener('click', AddTovarInKorzina);
        });
      }
    }, 200);
  }

  if (CheckUserTovarInKorzina.caller === RenderFunc)
  {
    StartTimer();
  }
  else 
  {
    $.ajax({
      method: "POST",
      url: '../PHP_Scripts/CheckUserTovarInKorzina.php',
      async: false,
      success (arg) {
        id_clocks = JSON.parse(arg);
      }
    })

    StartTimer();
  }
}

AddEvent();
CheckUserTovarInKorzina();