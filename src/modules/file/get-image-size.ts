/**
 * 실제 이미지가 가로로 뉘여져있는지 확인합니다.
 * 만약 가로로 뉘여져 있다면 width와 height를 뒤바꿔야 합니다.
 *
 * ### (참고) exif 정보
 *
 * 1. no nothing
 * 2. flip horizontally
 * 3. rotate 180 degrees
 * 4. flip vertically
 * 5. rotate 90 degrees clockwise and flip horizontally
 * 6. rotate 90 degrees clockwise
 * 7. rotate 90 degrees clockwise and flip vertically
 * 8. rotate 270 degrees clockwise
 *
 * @see https://zpl.fi/exif-orientation-in-different-formats/#handling-exif-orientation
 */
// export default async function getImageFileSize(image: File) {
//   const url = window.URL.createObjectURL(image);

//   const sizeInfo = await probe(url);

//   return sizeInfo.orientation && sizeInfo.orientation >= 5
//     ? { width: sizeInfo.height, height: sizeInfo.width }
//     : { width: sizeInfo.width, height: sizeInfo.height };
// }

export default function getImageFileSize(image: File) {
  return new Promise<{ width: number; height: number }>((resolve, reject) => {
    const url = window.URL.createObjectURL(image);
    const img = document.createElement("img");
    img.src = url;
    img.style.position = "fixed";
    img.style.top = "-9999px";
    img.style.bottom = "-9999px";
    document.body.appendChild(img);

    function onLoad(this: HTMLImageElement) {
      resolve({
        width: this.naturalWidth,
        height: this.naturalHeight,
      });
      img.remove();
    }

    // eslint-disable-next-line func-names
    img.addEventListener("load", onLoad);
    img.addEventListener("error", () => {
      reject(new Error("Image Error"));
      img.remove();
    });
  });
}
