import os
import pinecone
from dotenv import load_dotenv
from langchain.llms import OpenAI
from langchain.chat_models import ChatOpenAI
from langchain.schema import HumanMessage
from langchain.document_loaders import NotionDirectoryLoader
from langchain.document_loaders import NotionDBLoader
from langchain.document_loaders import TextLoader
from langchain.vectorstores import Pinecone
from langchain.embeddings.openai import OpenAIEmbeddings
from langchain.chains.question_answering import load_qa_chain
from langchain.text_splitter import RecursiveCharacterTextSplitter

def embed():
    load_dotenv()

    api_key = os.getenv('OPENAI_API_KEY')

    embeddings = OpenAIEmbeddings(openai_api_key=api_key)

    pinecone_key = os.getenv('PINECONE_API_KEY')
    pinecone_env = os.getenv('PINECONE_ENVIRONMENT')

    pinecone.init(api_key=pinecone_key, environment=pinecone_env)


def ask_question(question):
    load_dotenv()
    api_key = os.getenv('OPENAI_API_KEY')
    index_name = "capstone"

    llm = OpenAI(openai_api_key = api_key, temperature=0.9)
    chain = load_qa_chain(llm, chain_type="stuff")
    loader = NotionDirectoryLoader("../../notion/pages")


    docs = loader.load()

    markdown_splitter = RecursiveCharacterTextSplitter(
        separators=["#","##", "###", "\n\n","\n","."],
        chunk_size=1500,
        chunk_overlap=100)
    docs = markdown_splitter.split_documents(docs)
    query = question #example: "What is the mandate of the support department?"
    search = Pinecone.from_texts([d.page_content for d in docs], embeddings, index_name=index_name)

    docs = search.similarity_search(query)
    print(chain.run(input_documents=docs, question=query))
    return(chain.run(input_documents=docs, question=query))
