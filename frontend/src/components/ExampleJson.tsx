import exampleJson from './utils/exampleJson.json'

const ExampleJson = () => {
	return (
		<div className="mt-6 p-6 bg-white shadow rounded w-full max-w-lg mb-3">
				<p className='font-bold'>JSON Format Example</p>
				<br />
				<pre className="text-sm text-gray-800 text-wrap">
					{JSON.stringify(exampleJson, null, 2)}
				</pre>
			</div>
	)
}

export default ExampleJson