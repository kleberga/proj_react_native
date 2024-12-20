import { Appearance } from "react-native";
const isDarkMode = Appearance.getColorScheme() == 'dark';

const FontConstants = {
    familyRegular: 'Comfortaa',
    color: isDarkMode ? 'white' : "black",
    sizeTitle: 26,
    sizeSubtitle: 24,
    sizeLabel: 20,
};

const ColorsContants = {
    backgroundColor: isDarkMode ? "#595959" : "#ffffff",
    linkConstantsColor: isDarkMode ? '#75e6da' : '#3477eb',
    errorConstantsColor: isDarkMode? '#fd7f20' : "red",
};

const SizeContants = {

};

export { FontConstants, ColorsContants, SizeContants };