def includeme(config):
    """Add routes to the config."""
    config.add_static_view('static', 'static', cache_max_age=3600)
    
    # Default route
    config.add_route('home', '/')
    
    # Matakuliah routes dengan request_method untuk membedakan endpoint dengan URL yang sama
    config.add_route('matakuliah_list', '/api/matakuliah', request_method='GET')
    config.add_route('matakuliah_detail', '/api/matakuliah/{id}', request_method='GET')
    config.add_route('matakuliah_add', '/api/matakuliah', request_method='POST')
    config.add_route('matakuliah_update', '/api/matakuliah/{id}', request_method='PUT')
    config.add_route('matakuliah_delete', '/api/matakuliah/{id}', request_method='DELETE')