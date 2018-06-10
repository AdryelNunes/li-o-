    function addTarefa(nomeTarefa){
        var tarefas = recuperarListaTarefas();
        
        if(!tarefas){
            tarefas = [];
        }

        if(tarefas.indexOf(nomeTarefa) > -1){
            $("#erro_nome_tarefa").text("Tarefa já existe");
            return;
        }

        tarefas.push(nomeTarefa);
        salvarTarefasNoStorage(tarefas);
    }
    
    function listarTarefas(){
        var tarefas = recuperarListaTarefas();
        var html = "";
        
        tarefas.forEach(element => {
            html += montarLinhaTarefa(element);
        });
        
        $("#containerListagem").html(html);
    }

    function montarLinhaTarefa(element){
        return '<div class="row" id="row_' + element.replace(' ', '_') + '"><button class="btn" style="background: transparent"' +
        'onclick="deletarTarefa(\'' + element + '\')"><i class="fas fa-trash-alt"></i></button>' + 
        '<button class="btn" style="background: transparent" ' + 
        'onclick="editarTarefa(\'' + element + '\')"><i class="fas fa-edit"></i></button> - ' +
        element + '</div>';
    }

    function deletarTarefa(nomeTarefa){
        var tarefas = recuperarListaTarefas();

        tarefas.pop(nomeTarefa);
        salvarTarefasNoStorage(tarefas);

        listarTarefas();
    }

    function editarTarefa(nomeTarefa){
        var nomeSemEspaco = nomeTarefa.replace(' ', '_');
        var rowTarefa = $('#row_' + nomeSemEspaco);

        $(rowTarefa)
            .append('<input type="text" class="form-control"' + 
            'placeholder="Novo nome da tarefa" id="edit_' + nomeSemEspaco + '" />'+
            '<button class="btn btn-success" ' + 
            'onclick="atualizarTarefa(\'' + nomeTarefa + '\');" >Salvar</button>');
    }

    function atualizarTarefa(nomeTarefaSendoAtualizada){
        var tarefas = recuperarListaTarefas();
        var nomeSemEspaco = nomeTarefaSendoAtualizada.replace(' ', '_');
        var editInput = $("#edit_" + nomeSemEspaco).val();

        if(editInput === ""){
            $("#erro_novo_nome_tarefa").text("Preencha o valor da tarefa");
            return;
        }

        tarefas.pop(nomeTarefaSendoAtualizada);
        tarefas.push(editInput);

        salvarTarefasNoStorage(tarefas);
        listarTarefas();
    }

    function recuperarListaTarefas(){
        return JSON.parse(localStorage.getItem("tarefas"));
    }

    function salvarTarefasNoStorage(tarefas){
        localStorage.setItem("tarefas", JSON.stringify(tarefas));
    }