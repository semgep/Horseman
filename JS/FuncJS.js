const winPopup = document.getElementById("winPopup");
const closeWinPopupButton = document.getElementById("closeWinPopup");

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
  document.addEventListener("click", function (event) {
    if (winPopupElement && winPopupElement.style.display === "flex") {
      const clickedMyCommentTrigger = event.target.closest(
        ".my-comment-trigger"
      );

      if (!clickedMyCommentTrigger) {
        winPopupElement.style.display = "none";
        if (popupContentElement) {
          popupContentElement.style.backgroundColor = "#FFFFFF";
        }
      } else {
      }
    }
  });
});

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
        imageElement = document.createElement("img");
        // Добавляем imageElement в popupContent ДО textElement, если он уже есть
        const textContainer = popupContent.querySelector(
          "#commentTextContainer"
        );
        if (textContainer) {
          popupContent.insertBefore(imageElement, textContainer);
        } else {
          popupContent.appendChild(imageElement);
        }
      }
      // if (!imageElement) {
      //   imageElement = document.createElement("img");
      //   popupContent.appendChild(imageElement);
      // }
      imageElement.src = imageSrc;
      imageElement.alt = "Изображение комментария";
      // imageElement.style.maxWidth = "40%";
      // imageElement.style.height = "auto";
      // imageElement.style.marginRight = "20px";
      // imageElement.style.float = "left";
      // imageElement.style.marginBottom = "10px";

      // const textElement = document.createElement("div");
      let textElement = popupContent.querySelector("#commentTextContainer"); // Ищем существующий контейнер для текста
      if (!textElement) {
        // Если контейнера нет, создаем его
        textElement = document.createElement("div");
        textElement.id = "commentTextContainer"; // Даем ему ID, чтобы легче находить в будущем
        popupContent.appendChild(textElement); // Добавляем в popupContent
      }
      textElement.innerHTML = commentText;
      // ***** НАЧАЛО НОВОЙ ЛОГИКИ В JS *****
      // Динамическое скрытие текстового блока и управление размером изображения
      if (commentText.trim() === "") {
        // Проверяем, пуст ли текст (после удаления пробелов)
        textElement.style.display = "none"; // Скрываем текстовый блок
        // Если текстовый блок скрыт, картинка займет всю ширину
        // благодаря Flexbox и flex-grow (которые нужно добавить в CSS)
        imageElement.style.flexBasis = "100%"; // Картинка займет всю ширину Flex-контейнера
        imageElement.style.maxWidth = "100%"; // Убедимся, что она может растянуться
      } else {
        textElement.style.display = "block"; // Показываем текстовый блок
        imageElement.style.flexBasis = "auto"; // Возвращаем обычное поведение Flex-элемента
        // Здесь вы можете снова ограничить ширину картинки, если нужно,
        // например, imageElement.style.maxWidth = "40%";
        // НО ЛУЧШЕ УПРАВЛЯТЬ ЭТИМ ЧЕРЕЗ CSS.
      }
      // ***** КОНЕЦ НОВОЙ ЛОГИКИ В JS *****
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
  if (winPopup && winPopup.style.display === "block") {
    // Проверяем, был ли клик ВНЕ popup и ВНЕ элементов, которые его открывают
    // Если клик не внутри winPopup и не на кнопке/ссылке, которая его открыла
    if (
      !winPopup.contains(event.target) &&
      !event.target.closest(".my-comment-trigger")
    ) {
      winPopup.style.display = "none"; // Скрываем окно
    }
  }
});
/* ===================================================================== */
// function showImage(event, menu) {
//   var a, x, y, elm, win, rect, height, img;
//   a = document.elementFromPoint(event.clientX, event.clientY);
//   img = new Image();
//   img.onload = function () {
//     width = img.width;
//     if (menu == null) {
//       height = 100;
//       width = (img.width * 100) / img.height;
//     } else height = (100 * img.height) / img.width;

//     Show();
//   };

//   if (menu == null)
//     img.src = a.attributes.href.value.replace(".html", " Photo.jpg");
//   else img.src = a.attributes.href.value.replace(".html", " Wada.jpg");

//   function Show() {
//     rect = a.getBoundingClientRect();
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
//     widthWin = width + 5;

//     if (elm.bottom + height > win.bottom) y = elm.top - height - 15;
//     else y = elm.bottom;

//     if (menu == null) {
//       if (elm.left + widthWin > win.right) x = win.right - widthWin - 15;
//       else x = elm.left;
//     } else x = 30;

//     /* 				alert(elm.top+'/'+elm.bottom+'/'+height+'/'+win.bottom+'/'+y);
//      */

//     document.getElementById("imgPopupImage").src = img.src;

//     el = document.getElementById("imgPopup");
//     el.style.display = "block";
//     el.style.left = x + "px";
//     el.style.top = y + "px";
//   }
// }
/* ===================================================================== */
/* ===================================================================== */
// function hrefColor() {
//   for (i = 0; i < document.links.length; i++) {
//     var link = document.links[i];
//     var linkSplit = link.href.split("#");
//     if (linkSplit.length == 2) {
//       if (linkSplit[1] == "x") link.style.color = "Black";
//       else if (linkSplit[1] == "y") link.style.color = "Teal";
//     }
//   }
// }
/* ===================================================================== */
// function stopMedia(id) {
//   document.getElementById(id).pause();
// }
/* ===================================================================== */
// function playVideo(id) {
//   var video = document.getElementById(id);
//   if (video.played.length > 0) video.play();
// }
/* ===================================================================== */
// function playTrack(id) {
//   document.getElementById(id).play();
// }
/* ===================================================================== */
// function playEssay() {
//   var id = "Essay";
//   var href = location.href;
//   if (href.indexOf("#") == -1 || href.indexOf(id) > -1)
//     document.getElementById(id).click();
// }
