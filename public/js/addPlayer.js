const addPlayer = async (player_id) => {
    
    const player = await fetch(`/api/players/${player_id}`, {
            method: 'GET'
        })
        .then((res) => res.json())
        .then((data) => {return data});

    if($('#team-table')[0].childElementCount > 2){
        return;
    }

    if($('#team-table')[0].childElementCount == 0){
        $('#team-table-container').attr('style', 'margin-bottom: 40px; display: block;')
    }

    const tr = $('<tr>');

    const player_name = $('<th>');
    $(player_name).attr('scope','row');
    $(player_name).text(player.name);

    $(tr).append(player_name);

    const button_box = $('<th>');
    
    const btn = $('<button>');
    $(btn).attr('class', 'material-symbols-outlined');
    $(btn).attr('style', 'background-color: red;');
    $(btn).text('cancel');

    $(button_box).append(btn);

    $(tr).append(button_box);

    $(tr).attr('data-id', player_id);

    $('#team-table').append(tr);

}

$('.add-player').on('click', function(event){
    event.preventDefault();
    if($('#team-table')[0].childElementCount < 3){
        $(this).parent().parent().remove();
    }
    addPlayer($(this)[0].attributes[0].value);
});