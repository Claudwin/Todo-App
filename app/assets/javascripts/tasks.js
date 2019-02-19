$(function () {
    // The taskHtml method takes in a JavaScript representation
    // of the task and produces an HTML representation using
    // <li> tags
    function taskHtml(task) {
        const checkedStatus = task.done ? "checked" : "";
        let liElement = '<li><div class="view"><input class="toggle" type="checkbox"' +
            "data-id='" + task.id + "'" +
            checkedStatus +
            '><label>' +
            task.title +
            '</label></div></li>';
        return liElement;
    }

    // toggleTask takes in an HTML representation of
    // an event that fires from an HTML representation of
    // the toggle checkbox and  performs an API request to toggle
    // the value of the `done` field
    function toggleTask(e) {
        const itemId = $(e.target).data("id");

        const doneValue = Boolean($(e.target).is(':checked'));

        $.post("/tasks/" + itemId, {
            _method: "PUT",
            task: {
                done: doneValue
            }
        });
    }
    $.get("/tasks").success(function (data) {
        let htmlString = "";

        $.each(data, function (index, task) {
            htmlString += taskHtml(task);
        });
        let ulTodos = $('.todo-list');
        ulTodos.html(htmlString);

        $('.toggle').change(toggleTask);

    });

    //Input form API post request
    $('#new-form').submit(function (event) {
        event.preventDefault();
        const textbox = $(".new-todo");
        const payload = {
            task: {
                title: textbox.val()
            }
        };
        $.post("/tasks", payload).success(function (data) {
            const htmlString = taskHtml(data);
            let ulTodos = $('.todo-list');
            ulTodos.append(htmlString);
            $('.toggle').click(toggleTask);
            $('.new-todo').val('');
        });
    });

});