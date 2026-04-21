// Acessando as ferramentas do Firebase configuradas no index.html
const { db, collection, addDoc, getDocs, serverTimestamp, query, orderBy, doc, deleteDoc } = window.firebaseDB;

// --- 1. FUNÇÃO PARA CADASTRAR MISSÃO ---
async function addTask() {
    const desc = document.getElementById('task-desc').value;
    const category = document.getElementById('task-category').value;
    const secao = document.getElementById('task-secao').value;
    const executor = document.getElementById('task-executor').value;
    const superior = document.getElementById('task-superior').value;
    const createdAt = document.getElementById('task-created-at').value;
    const deadline = document.getElementById('task-deadline').value;

    if (!desc) {
        alert("Capitão, descreva a missão antes de cadastrar!");
        return;
    }

    const taskData = {
        descricao: desc,
        categoria: category,
        secao: secao,
        executor: executor,
        superior: superior,
        inicio: createdAt,
        prazo: deadline,
        status: "PENDENTE",
        criadoEm: serverTimestamp()
    };

    try {
        await addDoc(collection(db, "missoes"), taskData);
        alert("Missão enviada para a nuvem com sucesso!");
        limparFormulario();
        renderTasks(); 
    } catch (error) {
        console.error("Erro ao salvar:", error);
        alert("Erro técnico. Verifique as regras do Firestore.");
    }
}

// --- 2. FUNÇÃO PARA EXIBIR AS MISSÕES ---
async function renderTasks() {
    const taskList = document.getElementById('task-list');
    if(!taskList) return;

    taskList.innerHTML = "<tr><td colspan='7' style='text-align:center;'>Sincronizando...</td></tr>";

    try {
        const q = query(collection(db, "missoes"), orderBy("criadoEm", "desc"));
        const querySnapshot = await getDocs(q);
        taskList.innerHTML = ""; 

        querySnapshot.forEach((docSnap) => {
            const task = docSnap.data();
            const row = `
                <tr>
                    <td style="text-align:center;"><input type="checkbox"></td>
                    <td><span class="badge" style="background:#d4af37; color:black; padding:4px; border-radius:4px; font-weight:bold;">${task.status}</span></td>
                    <td><strong>${task.descricao}</strong><br><small>${task.categoria}</small></td>
                    <td>${task.executor}<br><small>Seção: ${task.secao}</small></td>
                    <td>Ini: ${task.inicio}<br>Fim: ${task.prazo}</td>
                    <td>${task.superior || 'N/A'}</td>
                    <td style="text-align:center;">
                        <button onclick="deleteTask('${docSnap.id}')" style="background:#ff4d4d; color:white; border:none; padding:5px 10px; border-radius:4px; cursor:pointer;">Excluir</button>
                    </td>
                </tr>
            `;
            taskList.innerHTML += row;
        });
    } catch (error) {
        console.error("Erro ao ler dados:", error);
    }
}

// --- 3. FUNÇÃO PARA EXCLUIR ---
async function deleteTask(id) {
    if(confirm("Deseja realmente apagar esta missão?")) {
        try {
            await deleteDoc(doc(db, "missoes", id));
            renderTasks();
        } catch (error) {
            alert("Erro ao excluir.");
        }
    }
}

// Auxiliares
function limparFormulario() {
    document.getElementById('task-desc').value = "";
    document.getElementById('task-executor').value = "";
}

function toggleFields() {
    const temSuperior = document.getElementById('task-tem-superior').value;
    document.getElementById('task-superior').disabled = (temSuperior === "NAO");
}

// Vincular ao Window para o HTML enxergar (necessário em modules)
window.addTask = addTask;
window.toggleFields = toggleFields;
window.deleteTask = deleteTask;

// Carregar ao iniciar
renderTasks();
