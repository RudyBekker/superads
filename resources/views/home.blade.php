@extends('spark::layouts.app')

@section('content')
<home :user="user" inline-template>
    

    

<script>
  import algoliasearch from 'algoliasearch/lite';
  
  export default {
    data() {
      return {
        searchClient: algoliasearch(
          '190229ZBIS',
          'ca76d001d309f417d0f6e99a8c141edf'
        ),
      };
    },
    el: '#app',
  };
</script>
  
</home>
@endsection

