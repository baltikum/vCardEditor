import re

class vcard:

  def __init__(self, n, fn, tel):

      if not (isinstance(n, str) and (n is not '')):
            raise ValueError(f"{n} is either empty or not a string.")
      self.n = n

      if not (isinstance(fn, str) and (fn is not '')):
            raise ValueError(f"{fn} is either empty or not a string.")

      temp = fn.strip()
      names = fn.split()
      edited_name = []
      for entry in names:
            if not entry.isupper():
                  temp = entry.lower()
                  temp = temp.capitalize()
            edited_name.append(temp)
      self.fn = ''.join(edited_name)


      pattern = re.compile("/[^0-9 +\-]/")

      if not (isinstance(tel, str) and not(tel == '') and not (re.match(pattern,tel))):
            raise ValueError(f"{tel} is either empty, not a string or not a phonenumber.")

      temp = tel.strip()
      country = '+46'
      regex = re.compile(country)

      match = regex.match(temp)
      if match:
            temp = temp.replace(regex, '0')

      self.tel = temp



def __repr__(self):
        return f'N:{self.n}FN:{self.fn}TEL:{self.tel}'

def __eq__(self, other):
        return (self.n == other.n) or (self.tel==other.tel)





