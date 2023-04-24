<template>
  <div class="app mt-5 -d-flex flex-column">
    <!-- <loader v-if="loading" /> -->
    <div class="container">
      <div class="input-group mb-3">
        <span @click="addTodo" class="input-group-text" id="basic-addon1">
          <i class="fs-3">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
              class="bi bi-file-earmark-plus" viewBox="0 0 16 16">
              <path
                d="M8 6.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V11a.5.5 0 0 1-1 0V9.5H6a.5.5 0 0 1 0-1h1.5V7a.5.5 0 0 1 .5-.5z" />
              <path
                d="M14 4.5V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5L14 4.5zm-3 0A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5h-2z" />
            </svg>
          </i>
        </span>
        <input @keydown.stop.enter="addTodo" v-model="inputValue" type="text" class="form-control p-2 fs-3"
          placeholder="Введите текст записи..." aria-label="Username" aria-describedby="basic-addon1" />
      </div>


      <section>
        <div class="notes-area" v-if="dataArray.length">
          <ul class="list-group">
            <li class="list-group-item mb-2 border d-flex justify-content-between" v-for="(item, idx) in dataArray"
              :key="item.id">
              <span>
                #{{ idx + 1 }}
              </span>
              <small class="mx-2 text-nowrap item-id">id: {{ item.id }}</small>
              <div contenteditable class="text-wrap my-2 padding-value item-value" @blur="updateTodo($event, item)">
                {{ item.value }}
              </div>
              <div class="d-flex">
                <div class="info d-flex flex-column">
                  <small class="mx-1 text-nowrap date-time d-flex ustify-content-center align-items-center">
                    {{ item.date }}&nbsp;
                    <i class="text-danger btn-hover" @click="removeTodo(item.id, idx + 1)">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                        class="bi bi-trash-fill" viewBox="0 0 16 16">
                        <path
                          d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                      </svg>
                    </i>
                  </small>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <strong class="text-danger" v-else>Записей пока нет!</strong>
      </section>

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { collection, onSnapshot, doc, addDoc, deleteDoc, updateDoc, query, orderBy } from 'firebase/firestore'
import { db } from './firebase'
import Loader from './components/Loader.vue'


const todosCollectionRef = collection(db, "todos")

const dataArray = ref([])
const inputValue = ref('')
const emptyValue = ref(false)
const loading = ref(true)

onMounted(() => {
  try {
    onSnapshot(collectionQuery, querySnapshot => {

      let fbTodos = []

      querySnapshot.forEach(doc => {
        const todo = {
          id: doc.id,
          value: doc.data().value,
          date: doc.data().date
        }
        fbTodos.unshift(todo)
      })
      dataArray.value = fbTodos
    })
  } catch (e) {
    console.log.console(e)
    loading.value = false
  }
  finally {
    loading.value = false
  }
})


const collectionQuery = query(todosCollectionRef, orderBy('date', 'asc'))

const addTodo = () => {

  if (inputValue.value) {
    addDoc(todosCollectionRef, {
      value: inputValue.value,
      date: new Date().toLocaleString()
    })
    inputValue.value = ''
  }
}

const removeTodo = (id, idx) => {
  const confirmRemove = confirm(`Удалить запись #${idx + 1} с id: ${id} ?`)
  if (confirmRemove) {
    deleteDoc(doc(db, "todos", id))
  }

}

const updateTodo = (e, item) => {
  const target = e.target
  let targetValue = e.target.innerText.trim()

  if (!targetValue) {
    targetValue = 'Значение поля не может быть пустым'
    item.value = targetValue
    target.style.border = '1px solid brown'

  } else {
    if (targetValue !== item.value.trim()) {
      target.style.border = '1px solid #fff'
      updateDoc(doc(todosCollectionRef, item.id), {
        value: e.target.innerText,
        date: new Date().toLocaleString()
      })
    }

  }

}

</script>

<style></style>
