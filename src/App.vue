<template>
  <div class="app mt-5">
    <div class="container">

      <div class="input-group mb-3">
        <span @click="addTodo" class="input-group-text" id="basic-addon1">
          <i class="bi bi-file-earmark-plus fs-3"></i>
        </span>
        <input @keydown.enter="addTodo" v-model="inputValue" type="text" class="form-control p-2 fs-3"
          placeholder="Введите текст записи..." aria-label="Username" aria-describedby="basic-addon1">
      </div>

      <div class="notes-area" v-if="dataArray.length">
        <ul class="list-group">
          <li class="list-group-item mb-2 border d-flex justify-content-between" 
          v-for="(item, idx) in dataArray"
         
            :key="item.id">
            <span>
              #{{ idx + 1 }}
            </span>
            <small class="mx-2 text-nowrap item-id">id: {{ item.id }}</small>
            <div contenteditable class="text-wrap my-2 padding-value item-value" @blur="updateTodo($event, item)"
            >
              {{ item.value }}
            </div>
            <div class="d-flex">
              <div class="info d-flex flex-column">
                <small class="mx-1 text-nowrap date-time d-flex ustify-content-center align-items-center">
                  {{ item.date }}&nbsp;
                  <i class="bi bi-trash-fill text-danger btn-hover" @click="removeTodo(item.id, idx + 1)"></i>
                </small>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <strong class="text-danger" v-else>Записей пока нет!</strong>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { collection, onSnapshot, doc, addDoc, deleteDoc, updateDoc, query, orderBy } from 'firebase/firestore'
import { db } from './firebase'


const todosCollectionRef = collection(db, "todos")

const dataArray = ref([])
const inputValue = ref('')
const emptyValue = ref(false)

onMounted(() => {
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
  const target =  e.target
  let targetValue = e.target.innerText.trim()

  if(!targetValue) {
    targetValue = 'Значение поля не может быть пустым'
    item.value = targetValue
    target.style.border = '1px solid brown'

  } else {
    if(targetValue !==  item.value.trim()) {
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
