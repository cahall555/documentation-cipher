import unittest
from unittest.mock import patch, Mock
from app import handle_query

class TestHandleQuery(unittest.TestCase):

    def setUp(self):
        self.mock_sid = "some_sid"
        self.mock_query = "What is the meaning of life?"

    @patch("app.sio.emit")
    @patch("app.ask_question")
    def test_handle_query(self, mock_ask_question, mock_emit):
    
        mock_ask_question.return_value = "42"
        
        handle_query(self.mock_sid, self.mock_query)
        
        # Check that ask_question was called with the correct query
        mock_ask_question.assert_called_with(self.mock_query)

        # Check that sio.emit was called with the correct arguments
        # once with the question and once with the answer
        mock_emit.assert_any_call('question', {'question': self.mock_query}, to=self.mock_sid)
        mock_emit.assert_any_call('answer', {'answer': '42'}, to=self.mock_sid)

if __name__ == '__main__':
    unittest.main()

