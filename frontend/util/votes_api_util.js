export const createVote = vote => (
    $.ajax({
        method: 'POST',
        url: '/api/votes',
        data: { vote }
    })
)

