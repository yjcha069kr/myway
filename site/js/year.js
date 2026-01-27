// URL에서 year 값 가져오기
const params = new URLSearchParams(window.location.search);
const year = params.get("year");

// 연도별 추억 데이터
const memoryData = {
  "2018": {
    title: "2018년",
    classTitle: "🐣 엘로우스카이2반 (만3세) 🐣",
    desc: "첫 직장, 부담임으로 일하며 든든한 담임선생님을 만나고, 정말 많은 사랑을 주던 아이들.",
    photos: [
      {
        img: "./assets/2021/img1.jpg",
        text: "첫 소풍 날, 도시락 들고 줄 서 있던 모습"
      },
      {
        img: "./assets/2021/img2.jpg",
        text: "비 오는 날 교실에서 그림 그리기"
      }
    ]
  },

  "2019": {
    title: "2019년",
    classTitle: "🐣 엘로우스카이2반 (만3세) 🐣",
    desc: "처음 담임을 맡아 힘들었지만, 믿고 응원해주던 학부모님들이 가장 많았던 해.",
    photos: [
      {
        img: "./assets/2021/img1.jpg",
        text: "첫 소풍 날, 도시락 들고 줄 서 있던 모습"
      },
      {
        img: "./assets/2021/img2.jpg",
        text: "비 오는 날 교실에서 그림 그리기"
      }
    ]
  },

  "2020": {
    title: "2020년",
    classTitle: "🐣 엘로우스카이1반 (만3세) 🐣",
    desc: "안전에 더 유의하던, 우당탕탕 장난꾸러기들을 만났던 해.",
    photos: [
      {
        img: "./assets/2021/img1.jpg",
        text: "첫 소풍 날, 도시락 들고 줄 서 있던 모습"
      },
      {
        img: "./assets/2021/img2.jpg",
        text: "비 오는 날 교실에서 그림 그리기"
      }
    ]
  },

  "2021": {
    title: "2021년",
    classTitle: "🐣 엘로우스카이1반 (만3세) 🐣",
    desc: "아이들과 학부모님들께 많은 응원과 사랑을 받았던 해.",
    photos: [
      {
        img: "./assets/2021/img1.jpg",
        text: "첫 소풍 날, 도시락 들고 줄 서 있던 모습"
      },
      {
        img: "./assets/2021/img2.jpg",
        text: "비 오는 날 교실에서 그림 그리기"
      }
    ]
  },

  "2022": {
    title: "2022년",
    classTitle: "🐣 행복2반 🐣 (만3세)",
    desc: "아기같은 친구들이 많았지만, 성장하는 모습을 더 볼 수 있던 해.",
    photos: [
      {
        img: "./assets/2021/img1.jpg",
        text: "첫 소풍 날, 도시락 들고 줄 서 있던 모습"
      },
      {
        img: "./assets/2021/img2.jpg",
        text: "비 오는 날 교실에서 그림 그리기"
      }
    ]
  },

  "2023": {
    title: "2023년",
    classTitle: "🐣 행복2반 🐣 (만3세)",
    desc: "가장 힘들었지만, 가장 기억에 남고 예뻤던 너희들을 만난 해.",
    photos: [
      {
        img: "./assets/2021/img1.jpg",
        text: "첫 소풍 날, 도시락 들고 줄 서 있던 모습"
      },
      {
        img: "./assets/2021/img2.jpg",
        text: "비 오는 날 교실에서 그림 그리기"
      }
    ]
  },

  "2024": {
    title: "2024년",
    classTitle: "🐣 행복2반 🐣 (만3세)",
    desc: "첫 직장에서의 마지막, 천사같은 아이들과 학부모님들을 만나 잘 마무리했던 해.",
    photos: [
      {
        img: "./assets/2021/img1.jpg",
        text: "첫 소풍 날, 도시락 들고 줄 서 있던 모습"
      },
      {
        img: "./assets/2021/img2.jpg",
        text: "비 오는 날 교실에서 그림 그리기"
      }
    ]
  },

  "2025": {
    title: "2025년",
    classTitle: "-",
    desc: "말이 부쩍 늘고, 웃음이 많아진 아이들.",
    photos: [
      {
        img: "./assets/2022/img1.jpg",
        text: "체육 시간에 공 굴리던 날"
      }
    ]
  },

  "2026": {
    title: "2026년",
    classTitle: "🐣 XX반 🐣 (만3세)",
    desc: "새로운 유치원에서 만난 너희들.",
    photos: [
      {
        img: "./assets/2022/img1.jpg",
        text: "체육 시간에 공 굴리던 날"
      }
    ]
  }
};

// 화면에 데이터 넣기
const data = memoryData[year];

document.getElementById("year-title").innerText = data.title;
document.getElementById("class-title").innerText = data.classTitle;
document.getElementById("class-desc").innerText = data.desc;

const photoList = document.getElementById("photo-list");

data.photos.forEach(item => {
  const card = document.createElement("div");
  card.className = "photo-card";

  card.innerHTML = `
    <img src="${item.img}" alt="">
    <p>${item.text}</p>
  `;

  photoList.appendChild(card);
});
