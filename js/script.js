const title = document.getElementById("title-bmi");
const resultSection = document.getElementById("resultSection");
const inputForm = document.getElementById("form-bmi");
const displayForm = document.getElementById("display-form");
const displayDesc = document.getElementById("display-desc");
const errorMessages = document.querySelectorAll(".error-message");
const imageResult = document.getElementById("image-result-bmi");

title.textContent = "Kalkulator BMI";

// Definisikan fungsi submitBmiCheck menggunakan arrow function
const submitBmiCheck = () => {
  // karena element dibawah ini digunakan pada saat submit saja maka di deklarasikan di dalam function
  // Ambil data pada masing masing element
  const genderElements = document.querySelectorAll('input[name="gender"]');
  const weight = parseFloat(document.getElementById("weight").value);
  const height = parseFloat(document.getElementById("height").value);
  const age = parseInt(document.getElementById("age").value);
  const genderErrorMessage = document.getElementById("genderErrorMessage");
  const weightErrorMessage = document.getElementById("weightErrorMessage");
  const heightErrorMessage = document.getElementById("heightErrorMessage");
  const ageErrorMessage = document.getElementById("ageErrorMessage");
  const bmiResultElement = document.getElementById("bmiResult");

  // Variabel untuk menyimpan nilai gender yang dipilih (null jika belum dipilih)
  let gender = null;

  // Loop melalui semua elemen radio button gender
  for (const element of genderElements) {
    // Jika suatu radio button dipilih (checked)
    if (element.checked) {
      // Simpan nilai gender yang dipilih ke dalam variabel "gender"
      gender = element.value;
      // Hentikan loop karena sudah mendapatkan nilai gender yang dipilih
      break;
    }
  }

  // Kosongkan pesan error sebelum melakukan validasi
  genderErrorMessage.textContent = "";
  weightErrorMessage.textContent = "";
  heightErrorMessage.textContent = "";
  ageErrorMessage.textContent = "";

  // Variabel untuk menandai apakah input valid atau tidak
  let isValid = true;

  // Validasi apakah jenis kelamin dipilih (tidak boleh null)
  if (!gender) {
    genderErrorMessage.textContent = "Pilih jenis kelamin.";
    isValid = false;
  }

  // Validasi apakah berat badan valid (angka > 0)
  if (isNaN(weight) || weight <= 0) {
    weightErrorMessage.textContent = "Masukkan berat badan yang valid.";
    isValid = false;
  }

  // Validasi apakah tinggi badan valid (angka > 0)
  if (isNaN(height) || height <= 0) {
    heightErrorMessage.textContent = "Masukkan tinggi badan yang valid.";
    isValid = false;
  }

  // Validasi apakah umur valid (angka > 0)
  if (isNaN(age) || age <= 0) {
    ageErrorMessage.textContent = "Masukkan umur yang valid.";
    isValid = false;
  }

  // Jika ada salah satu input tidak valid, hentikan proses lebih lanjut
  if (!isValid) {
    return;
  }

  // Calculate BMI
  const heightInMeters = height / 100;
  const bmi2 = weight / (heightInMeters * heightInMeters);
  let bmi = parseFloat(bmi2.toFixed(1));

  // Show Result Card and Hide Input Form

  resultSection.style.display = "flex";
  inputForm.classList.add("hidden");

  // Display the BMI result in the card
  let resultMessage = `BMI Anda \n adalah ${bmi.toFixed(2)}.`;
  const img = document.createElement("img");
  // Determine the BMI category
  if (bmi < 18.5) {
    resultMessage += "Kekurangan berat badan.";
    img.src = gender == "Pria" ? "/images/kurus-l.svg" : "/images/kurus-p.svg";
  } else if (bmi >= 18.5 && bmi <= 24.9) {
    resultMessage += " Normal (Ideal).";
    img.src = "/images/ideal.svg";
  } else if (bmi >= 25.0 && bmi <= 29.9) {
    resultMessage += " Kelebihan berat badan.";
    img.src = "/images/kelebihan-berat-badan.svg";
  } else {
    resultMessage += " Kegemukan (Obesitas).";
    img.src = "/images/obesitas.svg";
  }

  // set ketinggian gambar dan mulai menyisipkan gambar
  img.height = 200;
  imageResult.appendChild(img);

  bmiResultElement.textContent = resultMessage;

  displayForm.style.display = "none";
  displayDesc.style.display = "none";

  // set title
  title.textContent = "Hasil BMI mu";
};

function resetForm() {
  resultSection.style.display = "none";
  inputForm.reset();
  inputForm.classList.remove("hidden");

  // Clear Error Messages
  errorMessages.forEach((message) => (message.textContent = ""));
}

function backToForm() {
  resultSection.style.display = "none";
  inputForm.reset();
  inputForm.classList.remove("hidden");
  errorMessages.forEach((message) => (message.textContent = ""));

  // set title
  title.textContent = "Kalkulator BMI";

  //  id display-form display none
  displayForm.style.display = "flex";
  displayDesc.style.display = "flex";

  // hapus image yang berada pada id imageResult
  imageResult.innerHTML = "";
}

const inputElements = document.querySelectorAll("input");
inputElements.forEach((input) => {
  input.addEventListener("input", function () {
    const errorMessageId = `${input.name}ErrorMessage`;
    const errorMessageElement = document.getElementById(errorMessageId);
    errorMessageElement.textContent = "";
  });
});
