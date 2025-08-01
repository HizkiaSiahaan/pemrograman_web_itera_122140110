import argparse
import sys

from pyramid.paster import bootstrap, setup_logging
from sqlalchemy.exc import OperationalError

from .. import models


def setup_models(dbsession):
    """
    Add initial model objects.
    """
    # Tambahkan data awal untuk Matakuliah
    matakuliah1 = models.Matakuliah(
        kode_mk='IF2210',
        nama_mk='Pemrograman Berorientasi Objek',
        sks=4,
        semester=3
    )
    matakuliah2 = models.Matakuliah(
        kode_mk='IF2211',
        nama_mk='Strategi Algoritma',
        sks=3,
        semester=4
    )
    dbsession.add(matakuliah1)
    dbsession.add(matakuliah2)


def parse_args(argv):
    parser = argparse.ArgumentParser()
    parser.add_argument(
        'config_uri',
        help='Configuration file, e.g., development.ini',
    )
    return parser.parse_args(argv[1:])


def main(argv=sys.argv):
    args = parse_args(argv)
    setup_logging(args.config_uri)
    env = bootstrap(args.config_uri)

    try:
        with env['request'].tm:
            dbsession = env['request'].dbsession
            setup_models(dbsession)
    except OperationalError:
        print('''
Pyramid is having a problem using your SQL database.  The problem
might be caused by one of the following things:

1.  You may need to initialize your database tables with `alembic`.
    Check your README.txt for description and try to run it.

2.  Your database server may not be running.  Check that the
    database server referred to by the "sqlalchemy.url" setting in
    your "development.ini" file is running.
            ''')
        
if __name__ == '__main__':
    main()