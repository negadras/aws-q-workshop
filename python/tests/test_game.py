import pytest
from flask import session
from Qwords.errors import InvalidWordError, GameSessionError

def test_new_game_requires_username(client):
    """Test that new game requires a username."""
    with pytest.raises(GameSessionError):
        response = client.post('/new_game')    
        
def test_game_max_attempts(client):
    """Test that game enforces max attempts limit."""
    with client.session_transaction() as sess:
        sess['attempts'] = 6
    response = client.post('/game', data={'guess': 'test'})
    print(response)
    assert response.status_code == 400
    