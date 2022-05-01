from flask import Flask,request,redirect
import vobject

brokenCards = []
parsedCards = []

app = Flask(__name__)



@app.route("/load_contacts", methods = ['POST'] )
def load_contacts():
      global brokenCards,parsedCards

      cardList = []

      data = request.get_data(True,True,False)
      data = str(data)
      data = data.splitlines()

      if data:
            start = False
            card = False

            for line in data:

                  if not card:
                        newCard = []

                  if line.startswith('BEGIN:VCARD'):
                        start = True
                        card = True
                  elif line.startswith('END:VCARD'):
                        card = False

                  if start:
                        newCard.append(line + '\n')
                  
                  if not card :
                        if start:
                              cardList.append(newCard)

            
            for entry in cardList:
                  vcard = ''.join(entry)
                  try:    
                        temp = vobject.readOne(vcard)
                        if temp not in parsedCards:
                              parsedCards.append(temp)
                  except:
                        brokenCards.append(entry)
      
      return redirect('/get')

@app.route("/get_parsed", methods = ['GET'] )
def get_contacts():
      global parsedCards
      temp = []
      for card in parsedCards:
            temp.append('{')
            temp.append(f"N:{card.n.value},FN:{card.fn.value},TEL:{card.tel.value}")
            temp.append('}')
      temp = ''.join(temp)
      return '{"contacts":'+ temp + '}'

@app.route("/get_broken", methods = ['GET'] )
def get_contacts():
      global brokenCards
      broken = []
      for card in brokenCards:
            broken.append('{ BROKEN:'.join(card) + '}')

      return '{"BROKENCONTACTS"":'.join(broken) +'}'

@app.route("/clear", methods = ['POST'] )
def clear_contacts():
    global parsedCards,brokenCards
    parsedCards = []
    brokenCards = []
    return f'{parsedCards}{brokenCards}'


if __name__ == "__main__":
      app.run(debug=True)

