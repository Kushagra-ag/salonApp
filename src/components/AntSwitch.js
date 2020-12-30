import React, { useState } from 'react';
import { Switch, View } from 'react-native';

export default function AntSwitch() {
    const [checked, setChecked] = useState(false);

    const handleChange = () => {
        setChecked(checked => !checked);
    };

    return (
        <View>
            <Switch
                trackColor={{ false: '#767577', true: '#767577' }}
                thumbColor={checked ? '#f85f6a' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={handleChange}
                value={checked}
            />
        </View>
    );
}
