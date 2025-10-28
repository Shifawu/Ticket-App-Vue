<template>
  <section class="tickets container" aria-labelledby="tickets-title">
    <h2 id="tickets-title">Tickets</h2>

    <div class="card" style="margin-bottom:28px;">
      <h3>{{ editingId ? "Edit Ticket" : "Create Ticket" }}</h3>
      <form @submit.prevent="editingId ? handleUpdate() : handleCreate()" novalidate>
        <label>
          <span>Title</span>
          <input v-model="form.title" :aria-invalid="errors.title ? 'true' : 'false'" />
          <div v-if="errors.title" class="field-error">{{ errors.title }}</div>
        </label>

        <label>
          <span>Status</span>
          <select v-model="form.status" :aria-invalid="errors.status ? 'true' : 'false'">
            <option v-for="s in STATUS_OPTIONS" :key="s" :value="s">{{ s }}</option>
          </select>
          <div v-if="errors.status" class="field-error">{{ errors.status }}</div>
        </label>

        <label>
          <span>Description (optional)</span>
          <textarea v-model="form.description" />
          <div v-if="errors.description" class="field-error">{{ errors.description }}</div>
        </label>

        <label>
          <span>Priority (optional)</span>
          <select v-model="form.priority">
            <option value="">Select priority</option>
            <option value="low">Low</option>
            <option value="normal">Normal</option>
            <option value="high">High</option>
          </select>
        </label>

        <div class="form-actions">
          <button type="submit" class="btn btn-primary">{{ editingId ? "Update" : "Create" }}</button>
          <button v-if="editingId" type="button" class="btn btn-ghost" @click="cancelEdit">Cancel</button>
        </div>
      </form>
    </div>

    <div class="card tickets-list">
      <h3>Existing Tickets</h3>
      <p v-if="tickets.length === 0">No tickets yet — create one!</p>
      <div class="tickets-grid">
        <article v-for="t in tickets" :key="t.id" class="ticket-card card" :aria-labelledby="`title-${t.id}`">
          <div class="ticket-head">
            <h4 :id="`title-${t.id}`">{{ t.title }}</h4>
            <span :class="statusClass(t.status)">{{ t.status.replace('_',' ') }}</span>
          </div>
          <p class="muted">{{ t.description || 'No description' }}</p>
          <div class="ticket-meta">
            <small>Priority: {{ t.priority || 'normal' }}</small>
            <small>Created: {{ new Date(t.createdAt).toLocaleString() }}</small>
          </div>
          <div class="ticket-actions">
            <button class="btn btn-ghost" @click="startEdit(t.id)">Edit</button>
            <button class="btn btn-danger" @click="confirmDeleteId(t.id)">Delete</button>
          </div>
        </article>
      </div>
    </div>

    <div v-if="confirmDelete" class="modal" role="dialog" aria-modal="true">
      <div class="modal-card card">
        <p>Are you sure you want to delete this ticket?</p>
        <div class="form-actions">
          <button class="btn btn-danger" @click="handleDelete(confirmDelete)">Yes, delete</button>
          <button class="btn btn-ghost" @click="confirmDelete = null">Cancel</button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { ref, onMounted } from "vue";
import { useToast } from "../composables/useToast";

const TICKETS_KEY = "ticketapp_tickets";
const STATUS_OPTIONS = ["open", "in_progress", "closed"];

function loadTickets() {
  return JSON.parse(localStorage.getItem(TICKETS_KEY) || "[]");
}
function saveTickets(arr) {
  localStorage.setItem(TICKETS_KEY, JSON.stringify(arr));
  window.dispatchEvent(new Event("storage"));
}

export default {
  setup() {
    const { show } = useToast();
    const tickets = ref(loadTickets());
    const form = ref({ title: "", status: "open", description: "", priority: "" });
    const errors = ref({});
    const editingId = ref(null);
    const confirmDelete = ref(null);

    onMounted(() => {
      window.addEventListener("storage", () => (tickets.value = loadTickets()));
    });

    function validate() {
      const e = {};
      if (!form.value.title.trim()) e.title = "Title is required";
      if (!STATUS_OPTIONS.includes(form.value.status)) e.status = "Status must be one of: open, in_progress, closed";
      if (form.value.description && form.value.description.length > 1000) e.description = "Description is too long";
      errors.value = e;
      return Object.keys(e).length === 0;
    }

    function handleCreate() {
      if (!validate()) return;
      const newTicket = {
        id: Date.now(),
        title: form.value.title,
        status: form.value.status,
        description: form.value.description,
        priority: form.value.priority || "normal",
        createdAt: new Date().toISOString(),
      };
      tickets.value = [newTicket, ...tickets.value];
      saveTickets(tickets.value);
      form.value = { title: "", status: "open", description: "", priority: "" };
      show("Ticket created", "success");
    }

    function startEdit(id) {
      const t = tickets.value.find((x) => x.id === id);
      if (!t) return;
      editingId.value = id;
      form.value = { title: t.title, status: t.status, description: t.description || "", priority: t.priority || "" };
      window.scrollTo({ top: 0, behavior: "smooth" });
    }

    function handleUpdate() {
      if (!validate()) return;
      tickets.value = tickets.value.map((t) => (t.id === editingId.value ? { ...t, ...form.value } : t));
      saveTickets(tickets.value);
      editingId.value = null;
      form.value = { title: "", status: "open", description: "", priority: "" };
      show("Ticket updated", "success");
    }

    function cancelEdit() {
      editingId.value = null;
      form.value = { title: "", status: "open", description: "", priority: "" };
    }

    function confirmDeleteId(id) {
      confirmDelete.value = id;
    }

    function handleDelete(id) {
      tickets.value = tickets.value.filter((t) => t.id !== id);
      saveTickets(tickets.value);
      confirmDelete.value = null;
      show("Ticket deleted", "success");
    }

    function statusClass(s) {
      if (s === "open") return "tag-open";
      if (s === "in_progress") return "tag-progress";
      return "tag-closed";
    }

    return {
      tickets,
      form,
      errors,
      editingId,
      confirmDelete,
      STATUS_OPTIONS,
      handleCreate,
      startEdit,
      handleUpdate,
      cancelEdit,
      confirmDeleteId,
      handleDelete,
      statusClass,
    };
  },
};
</script>
