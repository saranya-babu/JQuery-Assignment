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

/*function samplefunc()
 {
var margin = {
    top: 20,
    right: 20,
    bottom: 30,
    left: 40
  },
  width = 960 - margin.left - margin.right,
  height = 500 - margin.top - margin.bottom;

var x = d3.scale.ordinal()
  .rangeRoundBands([0, width], .1);

var y = d3.scale.linear()
  .range([height, 0]);

var xAxis = d3.svg.axis()
  .scale(x)
  .orient("bottom");

var yAxis = d3.svg.axis()
  .scale(y)
  .orient("left")
  .ticks(10, "");

 

var svg = d3.select("body").append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.json('http://localhost:3000/name',function(data){

var k = [];
data.forEach(function(d) {
  d.record_date = d.record_date;
  d.total = +d.total;
  k.push(d.record_date)
});

x.domain(data.map(function(d) {
  return d.record_date;
}));
y.domain([0, d3.max(data, function(d) {
  return d.total;
})]);

svg.append("g")
  .attr("class", "x axis")
  .attr("transform", "translate(0," + height + ")")
  .call(xAxis);

svg.append("g")
  .attr("class", "y axis")
  .call(yAxis)
  .append("text")
  .attr("transform", "rotate(-90)")
  .attr("y", 6)
  .attr("dy", ".71em")
  .style("text-anchor", "end")
  .text("Count");

svg.selectAll(".bar")
  .data(data)
  .enter().append("rect")
  .attr("class", "bar")
  .attr("x", function(d) {
    return x(d.record_date);
  })
  .attr("width", x.rangeBand())
  .attr("y", function(d) {
    return y(d.total);
  })
  .attr("height", function(d) {
    return height - y(d.total);
  });


function type(d) {
  d.total = +d.total;
  return d;
}
});
}*/