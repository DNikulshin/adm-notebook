<template>
  <div class="app mt-5 -d-flex flex-column">
    <div class="container">
      <div class="input-group mb-3">
        <span @click="addTodo" class="input-group-text" id="basic-addon1">
          <i class="fs-3">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-pencil-square"
              viewBox="0 0 16 16">
              <path
                d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
              <path fill-rule="evenodd"
                d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
            </svg>
          </i>
        </span>
        <input @keydown.enter.prevent="addTodo" v-model="inputValue" type="text" class="form-control p-2 fs-3"
          placeholder="Введите текст записи..." aria-label="Username" aria-describedby="basic-addon1" ref="autoFocus"/>
      </div>

      <Loader v-if="loading" />
      <section v-else @click.stop>
        <div class="notes-area" v-if="dataArray.length">
          <ul class="list-group">
            <li class="list-group-item mb-2 border" v-for="(item, idx) in dataArray"
              :key="item.id">
              <span>
                #{{ idx + 1 }}
              </span>
              <small class="mx-2 text-nowrap item-id">id: <span>{{ item.id }}</span></small>
              <div contenteditable class="text-wrap my-2 padding-value item-value" @blur="updateTodo($event, item)">
                {{ item.value }}
              </div>
              <div class="d-flex">
                <div class="info d-flex flex-column">
                  <small class="mx-1 text-nowrap date-time">
                    {{ item.date }}&nbsp;
                    <i class="text-danger btn-hover" @click.prevent="removeTodo(item.id, idx)">
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
        <strong class="text-danger" v-show="!loading && !dataArray.length">Записей пока нет!</strong>
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

const collectionQuery = query(todosCollectionRef, orderBy('date', 'asc'))

const dataArray = ref([])
const inputValue = ref('')
const loading = ref(true)
const autoFocus = ref(null) 

onMounted(() => {
  try {
    autoFocus.value?.focus()
    onSnapshot(collectionQuery, { includeMetadataChanges: true }, querySnapshot => {

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
      loading.value = false
    })
  } catch (e) {
    loading.value = false
    console.log(e)
  }
})



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
  const confirmRemove = confirm(`Удалить запись ?  #${idx + 1} c id: ${id}`)
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
