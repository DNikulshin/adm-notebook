<template>
  <div class="app mt-5 d-flex flex-column" v-if="online">
    <div class="container">
      <div class="input-group mb-3">
        <span @click="addTodo" class="input-group-text" id="basic-addon1">
          <i class="fs-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              class="bi bi-pencil-square"
              viewBox="0 0 16 16"
            >
              <path
                d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"
              />
              <path
                fill-rule="evenodd"
                d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
              />
            </svg>
          </i>
        </span>
        <input
          @keydown.enter.prevent="addTodo"
          v-model="inputValue"
          type="text"
          class="form-control p-2 fs-3"
          placeholder="Введите текст записи..."
          aria-label="Username"
          aria-describedby="basic-addon1"
          ref="autoFocus"
        />
      </div>

      <Loader v-if="loading" />
      <section v-else @click.stop>
        <div class="notes-area" v-if="dataArray.length">
          <ul class="list-group">
            <li
              class="list-group-item mb-2 border item-shadow"
              v-for="(item, idx) in [...dataArray].sort((b, a) =>
                a.date.localeCompare(b.date),
              )"
              v-for="(item, idx) in sortArrray"
              :key="item.id"
              :class="{ done: item.done }"
            >
              <span class="user-select-none"> #{{ idx + 1 }} </span>
              <small class="mx-2 text-nowrap item-id user-select-none">
                <span>id:</span>
                <span>
                  {{ item.id }}
                </span>
              </small>
              <div
                contenteditable
                class="text-wrap my-2 padding-value item-value"
                @blur="updateTodo($event, item)"
              >
                {{ item.value }}
              </div>
              <div class="d-flex">
                <div class="info">
                  <small class="mx-1 text-nowrap date-time">
                    <span class="user-select-none">{{ item.date }}&nbsp</span>
                    <span class="d-flex flex-row-reverse flex-nowrap">
                      <i
                        class="text-dark mx-2 pe-1"
                        @click.prevent="toggleTools(item)"
                        @mouseenter.prevent="toggleTools(item)"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          fill="currentColor"
                          class="bi bi-three-dots-vertical"
                          viewBox="0 0 16 16"
                        >
                          <path
                            d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"
                          />
                        </svg>
                      </i>
                      <span v-show="item.showTools">
                        <i @click="toggleDoneItem(item)">
                          <svg
                            v-if="!item.done"
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            fill="currentColor"
                            class="bi bi-check2"
                            viewBox="0 0 16 16"
                          >
                            <path
                              d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"
                            />
                          </svg>
                          <svg
                            v-else
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            fill="currentColor"
                            class="bi bi-check2-all"
                            viewBox="0 0 16 16"
                          >
                            <path
                              d="M12.354 4.354a.5.5 0 0 0-.708-.708L5 10.293 1.854 7.146a.5.5 0 1 0-.708.708l3.5 3.5a.5.5 0 0 0 .708 0l7-7zm-4.208 7-.896-.897.707-.707.543.543 6.646-6.647a.5.5 0 0 1 .708.708l-7 7a.5.5 0 0 1-.708 0z"
                            />
                            <path
                              d="m5.354 7.146.896.897-.707.707-.897-.896a.5.5 0 1 1 .708-.708z"
                            />
                          </svg>
                        </i>
                        <i
                          class="text-danger btn-hover mx-2"
                          @click.prevent="removeTodo(item.id, idx)"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            fill="currentColor"
                            class="bi bi-trash-fill"
                            viewBox="0 0 16 16"
                          >
                            <path
                              d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"
                            />
                          </svg>
                        </i>
                      </span>
                    </span>
                  </small>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <strong class="text-danger" v-show="!loading && !dataArray.length"
          >Записей пока нет!</strong
        >
      </section>
    </div>
  </div>
  <div
    v-else
    class="container d-flex text-center text-danger justify-content-center flex-column align-items-center mt-2"
  >
    <strong class="mb-3">
      {{ toastMessage }}&nbsp;<span>Режим просмотра.</span>
    </strong>
    <a
      class="refresh text-primary"
      href="/"
      @click="window?.location?.reload()"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="50"
        height="50"
        fill="currentColor"
        class="bi bi-arrow-repeat text-primary"
        viewBox="0 0 16 16"
      >
        <path
          d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41zm-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9z"
        />
        <path
          fill-rule="evenodd"
          d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5.002 5.002 0 0 0 8 3zM3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9H3.1z"
        />
      </svg>
    </a>
    <div class="notes-area" v-if="dataArray.length">
      <ul class="list-group">
        <li
          class="list-group-item mb-2 border item-shadow"
          v-for="(item, idx) in dataArray"
          :key="item.id"
        >
          <span class="user-select-none item-idx"> #{{ idx + 1 }} </span>
          <small class="mx-2 text-nowrap item-id user-select-none">
            <span>id:</span>
            <span>
              {{ item.id }}
            </span>
          </small>
          <div class="text-wrap my-2 padding-value item-value">
            {{ item.value }}
          </div>
          <div class="d-flex">
            <div class="info">
              <small class="mx-1 text-nowrap date-time">
                <span class="user-select-none">{{ item.date }}&nbsp</span>
              </small>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
<<<<<<< HEAD
import { ref, onMounted } from "vue";
=======
import { ref, onMounted, computed } from "vue";
import moment from "moment";
>>>>>>> a6bf120ee1de9639e7b705b1c60bf4944a48b81a
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import {
  collection,
  onSnapshot,
  doc,
  addDoc,
  deleteDoc,
  updateDoc,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "./firebase";
import Loader from "./components/Loader.vue";

const todosCollectionRef = collection(db, "todos");


const collectionQuery = query(todosCollectionRef, orderBy("date", "asc"));

const dataArray = ref([]);
const collectionQuery = query(todosCollectionRef);

const dataArray = ref([]);
const dataArraySort = ref([]);

const inputValue = ref("");
const loading = ref(true);
const autoFocus = ref(null);
const online = ref(window?.navigator?.onLine);
const toastMessage = ref("");

const sortArrray = computed(() => {
  return [...dataArray.value].sort(
    (a, b) =>
      moment(b.date, "DD.MM.YYYY HH:mm:ss") -
      moment(a.date, "DD.MM.YYYY HH:mm:ss"),
  );
});
>>>>>>> a6bf120ee1de9639e7b705b1c60bf4944a48b81a

const notify = (msg) => {
  toast((toastMessage.value = msg), {
    type: "error",
    autoClose: 3000,
    position: toast.POSITION.TOP_CENTER,
    transition: toast.TRANSITIONS.FLIP,
  });
};

onMounted(() => {
  try {
    autoFocus.value?.focus();
    if (!online.value) {
      notify("Нет интернета!");
      if (localStorage.getItem("todoList")) {
        dataArray.value = JSON.parse(localStorage.getItem("todoList"));
      }
    } else {
      getItems();
    }
  } catch (e) {
    loading.value = false;
    console.log(e);
  }
});

const getItems = () => {
  onSnapshot(collectionQuery, (querySnapshot) => {
    let fbTodos = [];

    querySnapshot.forEach((doc) => {
      const todo = {
        id: doc.id.toString(),
        value: doc.data().value,
        date: doc.data().date,
        done: doc.data().done,
        status: doc.data().status,
        showTools: doc.data().showTools,
      };

<<<<<<< HEAD
      fbTodos.unshift(todo);
=======
      fbTodos.push(todo);
>>>>>>> a6bf120ee1de9639e7b705b1c60bf4944a48b81a
    });

    dataArray.value = fbTodos;

    localStorage.setItem("todoList", JSON.stringify(dataArray.value));
    loading.value = false;
  });
};

const addTodo = () => {
  if (inputValue.value) {
    addDoc(todosCollectionRef, {
      value: inputValue.value,
      date: moment().format("DD.MM.YYYY HH:mm:ss"),
      done: false,
      status: null,
      showTools: false,
    });
    inputValue.value = "";
  }
};

const removeTodo = (id, idx) => {
  const confirmRemove = confirm(`Удалить запись ?  #${idx + 1} c id: ${id}`);
  if (confirmRemove) {
    deleteDoc(doc(db, "todos", id));
  }
};

const updateTodo = (e, item) => {
  const target = e.target;
  let targetValue = e.target.innerText.trim();

  if (!targetValue) {
    targetValue = "Значение поля не может быть пустым";
    item.value = targetValue;
    target.style.border = "1px solid brown";
  } else {
    if (targetValue !== item.value.trim()) {
      target.style.border = "1px solid #fff";
      updateDoc(doc(todosCollectionRef, item.id), {
        value: e.target.innerText,
        date: new Date().toLocaleString(),
      });
    }
  }
};

const toggleDoneItem = (item) => {
  updateDoc(doc(todosCollectionRef, item.id), {
    done: !item.done,
  });
};

const toggleTools = (item) => {
  updateDoc(doc(todosCollectionRef, item.id), {
    showTools: !item.showTools,
  });
};
</script>

<style>
.item-shadow {
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.5) !important;
}

.done {
  background-color: rgb(192, 224, 192);
}

.refresh {
  position: fixed !important;
  bottom: 1.5rem !important;
  right: 1.5rem !important;
  z-index: 9999 !important;
}

.item-idx {
  position: absolute !important;
  left: 0.5rem;
  top: 0.5rem !important;
}
</style>
