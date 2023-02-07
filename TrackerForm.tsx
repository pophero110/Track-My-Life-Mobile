import {
	Text,
	TextInput,
	View,
	FlatList,
	TouchableOpacity,
	Button,
} from 'react-native';
import { useState } from 'react';

function InputLabel({ children }: { children: string }) {
	return <Text style={{ fontSize: 16, marginBottom: 8 }}>{children}</Text>;
}

export default function TrackerForm() {
	const defaultUnits = ['count', 'second', 'pound'];
	const [name, setName] = useState('');
	const [unit, setUnit] = useState('');
	const onSelectedUnit = (unit) => {
		setUnit(unit);
	};
	const createTracker = () => {
		console.log('li');
	};
	return (
		<View style={{ padding: '16px' }}>
			<Text style={{ fontSize: 28, marginBottom: 16 }}>
				Create Tracker
			</Text>
			<InputLabel>Name</InputLabel>
			<TextInput
				style={{
					height: 40,
					backgroundColor: 'white',
					padding: 8,
				}}
				value={name}
				onChangeText={(value) => setName(value)}
				placeholder='enter the name of tracker'
			/>
			<Text style={{ padding: 10 }}></Text>
			<InputLabel>Tracking Unit</InputLabel>
			<TextInput
				style={{
					height: 40,
					backgroundColor: 'white',
					padding: 8,
				}}
				value={unit}
				placeholder='select the unit of tracker'
			/>
			<FlatList
				style={{ backgroundColor: 'lightgrey' }}
				data={defaultUnits}
				renderItem={({ item }) => (
					<TouchableOpacity
						style={{ padding: 8 }}
						onPress={() => onSelectedUnit(item)}>
						<Text>{item || ''}</Text>
					</TouchableOpacity>
				)}
				keyExtractor={(item) => item}
			/>
			<Text style={{ padding: 10 }}></Text>
			<Button onPress={createTracker} title='create' />
		</View>
	);
}
