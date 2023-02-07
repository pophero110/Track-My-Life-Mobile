import { useState } from 'react';
import {
	Button,
	Text,
	FlatList,
	View,
	StyleSheet,
	Pressable,
} from 'react-native';

export default function HomeScreen({
	navigation,
}: {
	navigation: { navigate };
}) {
	return (
		<View style={{ padding: 16 }}>
			<View style={styles.sectionContainer}>
				<Text style={styles.sectionTitle}>Trackers</Text>
				<Button
					title='create'
					onPress={() => navigation.navigate('TrackerForm')}
				/>
			</View>
			<TrackerList></TrackerList>
		</View>
	);
}

function TrackerList() {
	return (
		<FlatList
			data={['1']}
			renderItem={({ item }) => <Trakcer></Trakcer>}
			keyExtractor={(item) => item}
		/>
	);
}

function Trakcer() {
	const [passedSeconds, setPassedSeconds] = useState(58);
	console.log(passedSeconds);
	const [intervalId, setIntervalId] = useState(null);
	const toggleTracker = () => {
		if (intervalId === null) {
			const newIntervalId = setInterval(() => {
				setPassedSeconds((prev) => prev + 1);
			}, 1000);
			console.log({ newIntervalId });
			setIntervalId(newIntervalId);
		} else {
			clearInterval(intervalId);
			setInterval(null);
		}
	};
	const formatTime = () => {
		let hours: string | number = Math.floor(passedSeconds / 3600);
		let minutes: string | number = Math.floor(
			(passedSeconds - hours * 3600) / 60
		);
		let seconds: string | number =
			passedSeconds - hours * 3600 - minutes * 60;

		if (hours < 10) {
			hours = '0' + hours;
		}
		if (minutes < 10) {
			minutes = '0' + minutes;
		}
		if (seconds < 10) {
			seconds = '0' + seconds;
		}
		return hours + ':' + minutes + ':' + seconds;
	};
	return (
		<View style={styles.trackerContainer}>
			<Pressable onPress={toggleTracker}>
				<View
					style={{
						flexDirection: 'row',
						justifyContent: 'space-between',
					}}>
					<Text>Eating</Text>
					<Text>{formatTime()}</Text>
				</View>
			</Pressable>
		</View>
	);
}

const styles = StyleSheet.create({
	sectionContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	sectionTitle: {
		fontSize: 28,
		marginBottom: 14,
	},
	trackerContainer: {
		backgroundColor: 'lightgrey',
		padding: 16,
	},
});
