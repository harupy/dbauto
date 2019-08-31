import configparser

config = configparser.SafeConfigParser()
config.read('options.cfg')
print(**config._sections['autopep8'])
