import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

// Add imports above this line
import { galleryItems } from "./gallery-items";
// Change code below this line

const listGallery = document.querySelector(".gallery");

const list = galleryItems
  .map(
    ({ preview, original, description }) =>
      `<div>
    <a class="gallery__link"  href="${original}">
    <img class="gallery__image" src="${preview}" alt="${description}"/>
    </a>
    </div>
    `
  )
  .join("");

listGallery.insertAdjacentHTML("beforeend", list);

listGallery.addEventListener("click", onTargetImgClick);

function onTargetImgClick(event) {
  event.preventDefault();

  const lightbox = new SimpleLightbox(".gallery a", {
    captions: true,
    captionsData: "alt",
    captionDelay: 250,
  });
}

console.log(galleryItems);
