import re

class vcard:


  def __init__(self, name, lastname, tel):
    
    def init_name(self,name):
      name = str(name)
      if name == '':
          self.editNames = True
      else:
        if name.isalpha():
          self.field_name = True
        else:
          self.editNames = True

      name = name.strip()
      names = name.split()
      name = ''
      for entry in names:
        if entry.isupper():
          name = name + ' ' + entry
        else:
          temp = entry.lower()
          temp = temp.capitalize()
          name = name + ' ' + temp


      self.n = name.strip()
      return True
    def init_lastname(self,lastname):
      lastname = str(lastname)
      if lastname == '':
          self.editNames = True
      else:
        if lastname.isalpha():
          self.field_lastname = True
        else:
          self.editNames = True

      lastname = lastname.strip()
      lastnames = lastname.split()
      lastname = ''
      for entry in lastnames:
        if entry.isupper():
          lastname = lastname + ' ' + entry
        else:
          temp = entry.lower()
          temp = temp.capitalize()
          lastname = lastname + ' ' + temp

      self.fn = lastname.strip()
      return True
    def init_tel(self,tel):
      pattern = re.compile("/[^0-9 +\-]/")
      tel = str(tel)
      tel = tel.strip()
      country = '+46'
      if tel != '' and re.match(pattern,tel):
        self.field_tel = True
        regex = re.compile(country)
        match = regex.match(tel)
        if match:
          tel = tel.replace(regex, '0')

      else:
        self.editTel = True

      self.tel = tel
      return True
    def compare_names(self):
      if self.fn == self.n:
        self.editNames = True
      return True
    
    self.field_name = False
    self.field_lastname = False
    self.field_tel = False

    self.editNames = False
    self.editTel = False

    init_name(self,name)
    init_lastname(self,lastname)
    init_tel(self,tel)
    compare_names(self)

  def get_json(self):
    return {'name': str(self.n), 'lastname':str(self.fn),'tel':str(self.tel),'editNames':str(self.editNames),'editTel':str(self.editTel)}

  def __eq__(self, other):
        return self.n == other.n





