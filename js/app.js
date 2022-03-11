// (c) lanz 2022

const calculateFilter = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    let r = parseInt(result[1], 16);
    let g = parseInt(result[2], 16);
    let b = parseInt(result[3], 16);

    const color = new Color(r, g, b);
    const solver = new Solver(color);

    return solver.solve();
};

const setBaseColorImage = (idSuffix, color) => {
    const images = document.querySelectorAll(".img.basecolor." + idSuffix);
    const { filter } = calculateFilter(color);

    images.forEach((img) => {
        img.setAttribute(
            "style",
            `filter: invert(1) ${filter};`
        );
    });
};

const handleColorPickerChange = (idSuffix) => {
    colorpicker = document.querySelector("#colorpicker-" + idSuffix);
    colorpicker.addEventListener("input", (evt) => {
        setBaseColorImage(idSuffix, evt.target.value);
    });
};

const initColorValues = () => {
    const initialBase01 = "#898989";
    const initialBase02 = "#FFFFFF";
    document.querySelector('#colorpicker-base01').value = initialBase01;
    document.querySelector('#colorpicker-base02').value = initialBase02;
    setBaseColorImage("base01", initialBase01);
    setBaseColorImage("base02", initialBase02);
};

const init = () => {
    initColorValues();
    handleColorPickerChange("base01");
    handleColorPickerChange("base02");
};

init();
