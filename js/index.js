$(document).ready(function(){
	var $data=$('#values');
	var $addYear=$('#addYear');
	var $addVal=$('#addVal');
	graph();
	jQuery.support.cors=true;

	 $.ajax({
	 	type:'get',
	 	url:'http://localhost:3000/name',
	 	success:function(data)
	 	{
	 		$.each(data,function(i,item){

 		    $data.append('<tr><td>'+item.Year+'</td><td>'+item.aggregateVal+'</td><td><button type="button" id='+item.Year+' class="remove btn btn-primary">Delete</button></td></tr>');
 		    

	 		});
	 	},
	 	error:function(result)
	 	{
	 		$result.append("File not found");
	 	}

	 });

	 

	 $('#btn-add').on('click',function()
	 {
	 	var item={
	 	Year: $addYear.val(),
	 	aggregateVal:$addVal.val(),
	 }

	
	  $.ajax({
	 	type:'post',
	 	url:'http://localhost:3000/name',
	 	dataType: "json",
	 	data:item,
	 	success:function(data)
	 	{
	 			$data.append('<tr><td>'+data.Year+'</td><td>'+data.aggregateVal+'</td><td><button type="button" id='+data.Year+' class="remove btn btn-primary">Delete</button></td></tr>');
	 			$('svg').remove();
	 			  graph();

	 	},
	 	error:function(result)
	 	{
	 		$result.append('Error in appending data');

	 	}

	 	});
	 
	 	$addYear.val('');
	 	$addVal.val('');   	 

	});



	  $data.delegate('.remove','click',function()
	  {
	  	var $tr=$(this).closest('tr');
	
	  	$.ajax(
	  	{
	  		type:'DELETE',
	  		url:'http://localhost:3000/name/'+$(this).attr('id'),
	  		success:function()
	  		{
	  			
	  			 $tr.remove();
	  			 $('svg').remove();
	 			 graph();

	  		},
	  		error:function(result)
	  		{
	  			$result.append('Error in deleting data');
	  		}

	  	});
	  });

});