const handleQuizSearch = async (event) => {
  event.preventDefault();

  const searchQuery = $("#searchQuery").val();

  window.location.replace(`/quiz/search?title=${searchQuery}`);
};

const searchCategories = async (event) => {
  const category_id = $(event.target).parent().attr("id");

  window.location.replace(`/quiz/search?category_id=${category_id}`);
};

const createQuizBase = async (event) => {
  event.preventDefault();

  const quizSuccessToast = $("#quizSuccessToast");
  const showQuizSuccessToast = new bootstrap.Toast(quizSuccessToast);
  const quizFailToast = $("#quizFailToast");
  const showQuizFailToast = new bootstrap.Toast(quizFailToast);

  const title = $("#quiz-title").val();
  const category_id = $("#category-select").val();
  const difficulty = $("#difficulty-select").val();

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    body: JSON.stringify({
      title,
      category_id,
      difficulty,
    }),
  };

  const response = await fetch("/api/quiz/create", options);

  if (response.status !== 201) {
    showQuizFailToast.show();
  } else {
    showQuizSuccessToast.show();
    setTimeout(function () {
      window.location.href = "/quiz/create/question";
    }, 1000);
  }
};

const createQuizQuestion = async (event) => {
  event.preventDefault();

  const questionSuccessToast = $("#questionSuccessToast");
  const showQuestionSuccessToast = new bootstrap.Toast(questionSuccessToast);
  const questionFailToast = $("#questionFailToast");
  const showQuestionFailToast = new bootstrap.Toast(questionFailToast);

  const question = $("#question").val();
  const correct_option = $("#correct-option").val();
  const option2 = $("#option2").val();
  const option3 = $("#option3").val();
  const option4 = $("#option4").val();

  const answersArray = [];

  if (!question || !correct_option || !option2 || !option3 || !option4) {
    showQuestionFailToast.show();
    return;
  }

  answersArray.push(correct_option, option2, option3, option4);

  const questionOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    body: JSON.stringify({
      question,
      correct_option,
    }),
  };

  const response = await fetch("/api/quiz/create/question", questionOptions);

  const answersOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    body: JSON.stringify({
      option: JSON.stringify(answersArray),
    }),
  };

  const answerResponse = await fetch(
    "/api/quiz/create/question/answer",
    answersOptions
  );

  if (response.status !== 201) {
    showQuestionFailToast.show();
  } else {
    showQuestionSuccessToast.show();
    setTimeout(function () {
      window.location.replace(`/quiz/create/question`);
    }, 1000);
  }
};

const finishCreateQuiz = (event) => {
  event.preventDefault();

  window.location.replace(`/quiz`);
};

const deleteQuiz = async (event) => {
  const id = event.currentTarget.id;

  const options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    body: JSON.stringify({
      id,
    }),
  };

  const response = await fetch(`/api/quiz/${id}`, options);

  if (response.status !== 200) {
    console.log("FAILED TO UPDATE POST");
  } else {
    window.location.replace("/dashboard");
  }
};

const generateQuiz = () => {
  const title = $("#quiz-title").val();
  const category_id = $("#category-select").val();
  const difficulty = $("#difficulty-select").val();

  window.location.replace(
    `/quiz/generate?title=${title}&category=${category_id}&difficulty=${difficulty}`
  );
};

$("#create-btn").click(createQuizBase);
$("#questionForm").submit(createQuizQuestion);
$("#doneCreate").click(finishCreateQuiz);
$("[name='delete-btn']").click(deleteQuiz);
$("#quizSearch").submit(handleQuizSearch);
$("#categories-container").click(searchCategories);
$("#generate-btn").click(generateQuiz);
