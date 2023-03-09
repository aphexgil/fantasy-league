const addTeam = async (player_ids) => {
    const teamBody = {
        name: $('#team-name-input').val().trim(),
        player_one: player_ids[0],
        player_two: player_ids[1],
        player_three: player_ids[2]
    };

    const resp = await fetch('/api/teams', {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(teamBody)
        })
        .then((resp) => resp.json())
        .then((data) => {
            console.log('Successful POST request:', data);
            return data;

        })
        .catch((err) => {console.error(err)});
    
    
    window.location.replace('/dashboard');
}

$('#submit-team').on('click', function(event){
    event.preventDefault();
    if($('#team-table')[0].childElementCount < 3 || !$('#team-name-input').val().trim()){
        return;
    }
    const player_ids = [parseInt($('#team-table').children()[0].attributes[0].value),
                    parseInt($('#team-table').children()[1].attributes[0].value),
                    parseInt($('#team-table').children()[2].attributes[0].value)];
    addTeam(player_ids);
})