const stats = ['healthy','stable','injured','recovering','exhausted','sick','cold'];
const buttons = document.querySelectorAll('input.stat-btn');
const statusField = document.getElementById('statusField');

buttons.forEach((button, index) => {
  button.addEventListener('click', () => {
    buttons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
    statusField.value = stats[index];
  });
});


//changes status styling depending on "positive" or "negative" status
function styleStatusTags() {
  const statusElements = document.querySelectorAll('.status-info-p');
  const tags = ['💪 Healthy', '😎 Stable', '😮‍💨 Recovering'];

  statusElements.forEach(status => {
    const text = status.textContent.trim();
    status.classList.remove('status-positive', 'status-negative'); // reset
    if (tags.includes(text)) {
      status.classList.add('status-positive');
    } else {
      status.classList.add('status-negative');
    }
  });
}
styleStatusTags();

//make "add new post" button disappear when appraoching bottom 100pixels of the window.
const createBtn = document.querySelector('.create-button');
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const viewportHeight = window.innerHeight;
    const fullHeight = document.body.offsetHeight;

    const distanceFromBottom = fullHeight - (scrollY + viewportHeight);

    if (distanceFromBottom < 100) {
      createBtn.style.opacity = '0';
      createBtn.style.pointerEvents = 'none';
    } else {
      createBtn.style.opacity = '1';
      createBtn.style.pointerEvents = 'auto';
    }
  });

  //"edit post" status state retreival
  window.addEventListener("DOMContentLoaded", () => {
    const currentStatus = document.getElementById("statusField").value.trim();
    const btns = document.querySelectorAll("btns");

    btns.forEach((button) => {
      if (button.value.trim() === currentStatus) {
        button.classList.add("active");
      } else {
        button.classList.remove("active");
      }
    });
  });