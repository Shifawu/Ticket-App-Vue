<template>
  <section class="dashboard container" aria-labelledby="dashboard-title">
    <h2 id="dashboard-title">Dashboard</h2>
    <div class="stats-grid">
      <div class="card stat">
        <h3>Total Tickets</h3>
        <p class="stat-value">{{ total }}</p>
      </div>
      <div class="card stat">
        <h3>Open</h3>
        <p class="stat-value">{{ open }}</p>
      </div>
      <div class="card stat">
        <h3>In Progress</h3>
        <p class="stat-value">{{ inProgress }}</p>
      </div>
      <div class="card stat">
        <h3>Closed</h3>
        <p class="stat-value">{{ closed }}</p>
      </div>
    </div>

    <div class="card" style="margin-top:12px">
      <h3>Quick Actions</h3>
      <p><router-link to="/tickets" class="btn btn-primary">Manage Tickets</router-link></p>
    </div>
  </section>
</template>

<script>
import { ref, computed, onMounted } from "vue";

const TICKETS_KEY = "ticketapp_tickets";
function loadTickets() { return JSON.parse(localStorage.getItem(TICKETS_KEY) || "[]"); }

export default {
  setup() {
    const tickets = ref(loadTickets());
    onMounted(() => {
      window.addEventListener("storage", () => (tickets.value = loadTickets()));
    });

    const total = computed(() => tickets.value.length);
    const open = computed(() => tickets.value.filter(t => t.status === "open").length);
    const inProgress = computed(() => tickets.value.filter(t => t.status === "in_progress").length);
    const closed = computed(() => tickets.value.filter(t => t.status === "closed").length);

    return { total, open, inProgress, closed };
  },
};
</script>
