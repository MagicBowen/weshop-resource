import os
import sys
import json
import codecs

def get_product(path, file):
    print('deal product {}'.format(path))
    with open(os.path.join(path, 'intro.json'), 'r') as product_json:
        product = json.loads(product_json.read())
        file.write('{ "index" : { "_index" : "weshop", "_type" : "product", "_id" : "%s" } }\n' % path.split(os.path.sep)[-1]) 
        file.write(json.dumps(product).replace('.5"', '/2"'))
        file.write('\n')


def generate_products(products_folder, file):
    for path in os.listdir(products_folder):
        if os.path.isdir(path):
            get_product(path, file)

def generate_json(input_folder, json_file):
    with open(json_file, 'w') as file:
        products = generate_products(input_folder,file)


if __name__ == '__main__':
    json_file = './esdata.json'
    input_folder = '.'
    generate_json(input_folder, json_file)