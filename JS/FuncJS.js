// const currentWinPopup = document.getElementById("winPopup");

// ДОБАВЬТЕ ЭТИ ТРИ СТРОКИ ДЛЯ ТОЧНОЙ ДИАГНОСТИКИ
// console.log("Значение currentWinPopup:", currentWinPopup);
// console.log("Тип currentWinPopup:", typeof currentWinPopup);
// console.log("currentWinPopup === null:", currentWinPopup === null);
// function showPopup(event, image, width, height, text, pos) {
//   var x, y, elm, win, rect, ctx, widthText, widthWin, el, img, k;
//   if (image != null && (width == 0 || height == 0)) {
//     img = new Image();
//     img.onload = function () {
//       if (width == 0) width = img.width;
//       if (height == 0) height = img.height;
//       Show();
//     };
//     img.src = image;
//   } else Show();
//   /* ============================= */
//   function Show() {
//     hideWin("winPopup");
//     rect = document
//       .elementFromPoint(event.clientX, event.clientY)
//       .getBoundingClientRect();
//     (elm = {
//       top: window.pageYOffset + rect.top,
//       left: window.pageXOffset + rect.left,
//       right: window.pageXOffset + rect.right,
//       bottom: window.pageYOffset + rect.bottom,
//     }),
//       (win = {
//         top: window.pageYOffset,
//         left: window.pageXOffset,
//         right: window.pageXOffset + document.documentElement.clientWidth,
//         bottom: window.pageYOffset + document.documentElement.clientHeight,
//       });

//     if (image == null) {
//       width = 0;
//       image = "";
//     }
//     if (text == null) {
//       widthText = 0;
//       text = "";
//     } else {
//       ctx = document.createElement("canvas").getContext("2d");
//       ctx.font = "14px italic Arial";
//       widthText = ctx.measureText(text).width / (height / 24);
//     }
//     widthWin = width + widthText + 5;

//     if (elm.left + widthWin > win.right) x = win.right - widthWin - 15;
//     else x = elm.left;

//     if (elm.bottom + height > win.bottom) y = elm.top - height - 15;
//     else y = elm.bottom;

//     if (image != null) document.getElementById("winPopupImage").src = image;

//     document.getElementById("winPopupText").innerHTML = text;
//     el = document.getElementById("winPopup");
//     el.style.display = "block";
//     if (pos == "top") {
//       el.style.left = 25 + "px";
//       el.style.top = 15 + "px";
//     } else {
//       el.style.left = x + "px";
//       el.style.top = y + "px";
//     }
//     el.style.width = widthWin + "px";
//     el.style.height = height + "px";
//   }
// }
function showPopup(event, imageSrc, x, y, commentText) {
  // ВАЖНО: Останавливаем всплытие события ЗДЕСЬ, чтобы клик по [i] не вызывал сразу же закрытие popup
  if (event) {
    // Проверяем, что event существует
    event.stopPropagation();
  }

  const currentWinPopup = document.getElementById("winPopup");

  if (currentWinPopup) {
    currentWinPopup.style.display = "flex"; // Показываем окно

    const popupContent = document.getElementById("popupContent");
    if (popupContent) {
      // popupContent.innerHTML = "";
      popupContent.style.backgroundColor = "lavender";
      let imageElement = popupContent.querySelector("img"); // Ищем существующую картинку
      if (!imageElement) {
        // Если картинки нет, создаем её
        imageElement = document.createElement("img");
        popupContent.appendChild(imageElement); // Добавляем в popupContent
      }
      // const imageElement = document.createElement("img");
      imageElement.src = imageSrc;
      imageElement.alt = "Изображение комментария";
      imageElement.style.maxWidth = "40%";
      imageElement.style.height = "auto";
      imageElement.style.marginRight = "20px";
      imageElement.style.float = "left";
      imageElement.style.marginBottom = "10px";

      // const textElement = document.createElement("div");
      let textElement = popupContent.querySelector("#commentTextContainer"); // Ищем существующий контейнер для текста
      if (!textElement) {
        // Если контейнера нет, создаем его
        textElement = document.createElement("div");
        textElement.id = "commentTextContainer"; // Даем ему ID, чтобы легче находить в будущем
        popupContent.appendChild(textElement); // Добавляем в popupContent
      }
      textElement.innerHTML = commentText;
      // Убедитесь, что кнопка закрытия находится ПЕРЕД динамически добавляемыми элементами
      const closeButton = document.getElementById("closeWinPopup");
      if (closeButton && popupContent.firstChild !== closeButton) {
        popupContent.prepend(closeButton); // Перемещаем кнопку в самое начало, если она не там
      }
      // popupContent.appendChild(imageElement);
      // popupContent.appendChild(textElement);
    }
  } else {
    console.error(
      "Ошибка: Элемент #winPopup не найден в DOM. Проверьте ID в HTML."
    );
  }
}
const winPopup = document.getElementById("winPopup");
const closeWinPopupButton = document.getElementById("closeWinPopup");
// 1. Закрытие по клику на кнопку "X"
if (closeWinPopupButton) {
  closeWinPopupButton.addEventListener("click", function () {
    if (winPopup) {
      winPopup.style.display = "none"; // Скрываем окно
    }
  });
}

// 2. Закрытие по клику ВНЕ окна Popup
document.addEventListener("click", function (event) {
  // Проверяем, существует ли winPopup и отображается ли он
  if (winPopup && winPopup.style.display === "block") {
    // Проверяем, был ли клик ВНЕ popup и ВНЕ элементов, которые его открывают
    // Если клик не внутри winPopup и не на кнопке/ссылке, которая его открыла
    if (
      !winPopup.contains(event.target) &&
      !event.target.closest(".my-comment-trigger")
    ) {
      // event.target.closest('.my-comment-trigger') - это наш новый кликабельный [i]
      // Добавьте сюда другие классы/ID, если у вас есть другие элементы, открывающие winPopup
      winPopup.style.display = "none"; // Скрываем окно
    }
  }
});
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
      listItem.innerHTML = `<strong>${commentNumber}</strong> ${commentText}`;
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

document.addEventListener("DOMContentLoaded", function () {
  setupAuthorComments();

  const winPopupElement = document.getElementById("winPopup");
  const closeWinPopupButton = document.getElementById("closeWinPopup");
  const popupContentElement = document.getElementById("popupContent"); // Получаем ссылку на popupContent

  // Добавляем обработчик клика ТОЛЬКО НА КОНТЕНТНЫЙ БЛОК, чтобы клики ВНУТРИ НЕ ЗАКРЫВАЛИ
  if (popupContentElement) {
    // Важно: проверяем popupContentElement
    popupContentElement.addEventListener("click", function (event) {
      event.stopPropagation(); // Останавливаем всплытие клика только для контентного блока
    });
  } else {
    console.error(
      "popupContentElement is null, cannot add internal click listener."
    );
  }

  // 1. Закрытие по клику на кнопку "X" (без изменений)
  if (closeWinPopupButton && winPopupElement) {
    closeWinPopupButton.addEventListener("click", function () {
      winPopupElement.style.display = "none";
      if (popupContentElement) {
        // Используем popupContentElement
        popupContentElement.style.backgroundColor = "#FFFFFF";
      }
    });
  } else {
    console.error(
      "closeWinPopupButton or winPopupElement is null, cannot add close button listener."
    );
  }

  // 2. Закрытие по клику ВНЕ окна Popup
  // Теперь этот обработчик будет срабатывать, когда клик попадает на winPopupElement, но НЕ на popupContentElement
  document.addEventListener("click", function (event) {
    if (winPopupElement && winPopupElement.style.display === "flex") {
      // Проверяем, был ли клик на элементе, который открывает popup ([i])
      const clickedMyCommentTrigger = event.target.closest(
        ".my-comment-trigger"
      );

      // Если клик не на триггере, закрываем popup
      // Здесь условие будет проще: если клик не на триггере, и popup виден, закрываем.
      // Клик внутри popupContent уже будет остановлен (stopPropagation)
      if (!clickedMyCommentTrigger) {
        winPopupElement.style.display = "none";
        if (popupContentElement) {
          // Используем popupContentElement
          popupContentElement.style.backgroundColor = "#FFFFFF";
        }
      } else {
      }
    } else {
      console.log("Popup is not visible or not found.");
    }
  });
});
