function showPopup(event, image, width, height, text, pos) {
  var x, y, elm, win, rect, ctx, widthText, widthWin, el, img, k;
  if (image != null && (width == 0 || height == 0)) {
    img = new Image();
    img.onload = function () {
      if (width == 0) width = img.width;
      if (height == 0) height = img.height;
      Show();
    };
    img.src = image;
  } else Show();
  /* ============================= */
  function Show() {
    hideWin("winPopup");
    rect = document
      .elementFromPoint(event.clientX, event.clientY)
      .getBoundingClientRect();
    (elm = {
      top: window.pageYOffset + rect.top,
      left: window.pageXOffset + rect.left,
      right: window.pageXOffset + rect.right,
      bottom: window.pageYOffset + rect.bottom,
    }),
      (win = {
        top: window.pageYOffset,
        left: window.pageXOffset,
        right: window.pageXOffset + document.documentElement.clientWidth,
        bottom: window.pageYOffset + document.documentElement.clientHeight,
      });

    if (image == null) {
      width = 0;
      image = "";
    }
    if (text == null) {
      widthText = 0;
      text = "";
    } else {
      ctx = document.createElement("canvas").getContext("2d");
      ctx.font = "14px italic Arial";
      widthText = ctx.measureText(text).width / (height / 24);
    }
    widthWin = width + widthText + 5;

    if (elm.left + widthWin > win.right) x = win.right - widthWin - 15;
    else x = elm.left;

    if (elm.bottom + height > win.bottom) y = elm.top - height - 15;
    else y = elm.bottom;

    if (image != null) document.getElementById("winPopupImage").src = image;

    document.getElementById("winPopupText").innerHTML = text;
    el = document.getElementById("winPopup");
    el.style.display = "block";
    if (pos == "top") {
      el.style.left = 25 + "px";
      el.style.top = 15 + "px";
    } else {
      el.style.left = x + "px";
      el.style.top = y + "px";
    }
    el.style.width = widthWin + "px";
    el.style.height = height + "px";
  }
}
/* ===================================================================== */
function showImage(event, menu) {
  var a, x, y, elm, win, rect, height, img;
  a = document.elementFromPoint(event.clientX, event.clientY);
  img = new Image();
  img.onload = function () {
    width = img.width;
    if (menu == null) {
      height = 100;
      width = (img.width * 100) / img.height;
    } else height = (100 * img.height) / img.width;

    Show();
  };

  if (menu == null)
    img.src = a.attributes.href.value.replace(".html", " Photo.jpg");
  else img.src = a.attributes.href.value.replace(".html", " Wada.jpg");

  function Show() {
    rect = a.getBoundingClientRect();
    (elm = {
      top: window.pageYOffset + rect.top,
      left: window.pageXOffset + rect.left,
      right: window.pageXOffset + rect.right,
      bottom: window.pageYOffset + rect.bottom,
    }),
      (win = {
        top: window.pageYOffset,
        left: window.pageXOffset,
        right: window.pageXOffset + document.documentElement.clientWidth,
        bottom: window.pageYOffset + document.documentElement.clientHeight,
      });
    widthWin = width + 5;

    if (elm.bottom + height > win.bottom) y = elm.top - height - 15;
    else y = elm.bottom;

    if (menu == null) {
      if (elm.left + widthWin > win.right) x = win.right - widthWin - 15;
      else x = elm.left;
    } else x = 30;

    /* 				alert(elm.top+'/'+elm.bottom+'/'+height+'/'+win.bottom+'/'+y);
     */

    document.getElementById("imgPopupImage").src = img.src;

    el = document.getElementById("imgPopup");
    el.style.display = "block";
    el.style.left = x + "px";
    el.style.top = y + "px";
  }
}
/* ===================================================================== */
function hideWin(id) {
  /* 			alert(location.href+'\n'+location.pathname);
		    			alert(window.location.href);
		    			alert(location); */
  document.getElementById(id).style.display = "none";
}
/* ===================================================================== */
function hrefColor() {
  for (i = 0; i < document.links.length; i++) {
    var link = document.links[i];
    var linkSplit = link.href.split("#");
    if (linkSplit.length == 2) {
      /* alert (link.href.split('#')[1]+'/'+document.links[i].innerHTML); */
      if (linkSplit[1] == "x") link.style.color = "Black";
      else if (linkSplit[1] == "y") link.style.color = "Teal";
    }
  }
}
/* ===================================================================== */
function stopMedia(id) {
  document.getElementById(id).pause();
}
/* ===================================================================== */
function playVideo(id) {
  var video = document.getElementById(id);
  if (video.played.length > 0) video.play();
}
/* ===================================================================== */
function playTrack(id) {
  document.getElementById(id).play();
}
/* ===================================================================== */
function playEssay() {
  var id = "Essay";
  var href = location.href;
  if (href.indexOf("#") == -1 || href.indexOf(id) > -1)
    document.getElementById(id).click();
}
/* ===================================================================== */
// $(document).ready(function () {
//   var el = $("#nav_list_3 li a");
//   $('#nav_list_3 li:has("ul")').append("<span></span>");
//   el.click(function () {
//     $("a[href]").css("background", "Mintcream");
//     var checkedElement = $(this).next(),
//       visibleElement = $("#nav_list_3 ul:visible");

//     /* Sam */
//     if (checkedElement.is("ul") && visibleElement.is("ul"))
//       visibleElement
//         .stop()
//         .animate(
//           {
//             height: "toggle",
//           },
//           500
//         )
//         .parent()
//         .removeClass("active");

//     if (checkedElement.is("ul") && !checkedElement.is(":visible")) {
//       checkedElement
//         .stop()
//         .animate(
//           {
//             height: "toggle",
//           },
//           500
//         )
//         .parent()
//         .toggleClass("active");
//       return false;
//     } else $(this).css("background", "Linen");

//     if (checkedElement.is("ul") && checkedElement.is(":visible")) {
//       return false;
//     }
//   });
// });
// $(document).ready(function () {
//   //            https://electrictoolbox.com/style-html-anchor-title-jquery-css/
//   $('a[href="#t"]').each(function () {
//     $("body").append('<div id="anchorTitle"></div>');
//     var a = $(this);
//     a.data("title", a.attr("title"))
//       .removeAttr("title")
//       .hover(
//         function () {
//           if (a.attr("href") == "#t") {
//             showAnchorTitle(a, a.data("title"));
//           }
//         },
//         function () {
//           hideAnchorTitle();
//         }
//       );
//   });
// });

// function showAnchorTitle(element, text) {
//   var offset = element.offset();
//   $("#anchorTitle")
//     .css({
//       top: offset.top + element.outerHeight() - 4 + "px",
//       left: offset.left + 4 + "px",
//     })
//     .html(text)
//     .show();
// }

// function hideAnchorTitle() {
//   $("#anchorTitle").hide();
// }
// Функция для сбора и отображения авторских комментариев
function setupAuthorComments() {
  // Находим все <a> элементы, у которых есть атрибут 'title'
  // Мы предполагаем, что именно 'title' содержит авторский комментарий
  // const commentLinks = document.querySelectorAll("a[title]");
  const authorCommentSups = document.querySelectorAll(
    "sup[data-author-comment]"
  );
  const authorCommentsList = document.getElementById("author-comments-list");
  const authorCommentsSection = document.getElementById(
    "author-comments-section"
  );
  let commentCount = 0;

  // Проверяем, существуют ли целевые элементы в HTML
  if (!authorCommentsList || !authorCommentsSection) {
    console.warn(
      "Ошибка: Контейнеры для авторских комментариев (#author-comments-list или #author-comments-section) не найдены в HTML."
    );
    return;
  }

  // Очищаем список перед добавлением (на случай повторного вызова или старого контента)
  authorCommentsList.innerHTML = "";

  authorCommentSups.forEach((supElement) => {
    // Теперь мы перебираем <sup> элементы
    const commentText = supElement.getAttribute("data-author-comment"); // Получаем текст из data-author-comment
    const commentNumber = supElement.textContent.trim(); // Получаем номер из содержимого <sup>

    if (commentText) {
      commentCount++;
      const listItem = document.createElement("li");
      listItem.innerHTML = `<strong>${commentNumber}.</strong> ${commentText}`;
      authorCommentsList.appendChild(listItem);
      // Здесь не нужно удалять атрибут, так как data-атрибуты не вызывают нативных подсказок
    }
  });

  // Показываем или скрываем раздел комментариев в зависимости от их наличия
  if (commentCount > 0) {
    authorCommentsSection.style.display = "block"; // Показываем раздел
  } else {
    authorCommentsSection.style.display = "none"; // Скрываем раздел
  }
}

// Вызываем функцию после полной загрузки DOM-дерева
document.addEventListener("DOMContentLoaded", setupAuthorComments);
