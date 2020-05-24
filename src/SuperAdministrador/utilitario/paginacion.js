import React from 'react';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles, useTheme } from '@material-ui/core/styles';

export const TablePaginationActions = (props) => {

	const classes = useStyles1();
	const theme = useTheme()
	const { count, page, rowsPerPage, onChangePage } = props;

	const handleFirstPageButtonClick = (event) => {
		onChangePage(event, 0);
	};

	const handleBackButtonClick = (event) => {
		onChangePage(event, page - 1);
	};

	const handleNextButtonClick = (event) => {
		onChangePage(event, page + 1);
	};

	const handleLastPageButtonClick = (event) => {
		onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
	};

	return (
		<div className={classes.root}>
			<Tooltip title="Primera pagina" placement="bottom">
				<IconButton
				component="div"
					onClick={handleFirstPageButtonClick}
					disabled={page === 0}
					aria-label="first page"
				>
					{theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
				</IconButton>
			</Tooltip>

			<Tooltip title="Pagina anterior" placement="bottom">
				<IconButton onClick={handleBackButtonClick} component="div" disabled={page === 0} aria-label="previous page">
					{theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
				</IconButton>
			</Tooltip>

			<Tooltip title="Siguiente pagina" placement="bottom">
				<IconButton
				component="div"
					onClick={handleNextButtonClick}
					disabled={page >= Math.ceil(count / rowsPerPage) - 1}
					aria-label="next page"
				>
					{theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
				</IconButton>
			</Tooltip>
			<Tooltip title="Ultima pagina" placement="bottom">
				<IconButton
				component="div"
					onClick={handleLastPageButtonClick}
					disabled={page >= Math.ceil(count / rowsPerPage) - 1}
					aria-label="last page"
				>

					{theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
				</IconButton>
			</Tooltip>
		</div>
	);
}

const useStyles1 = makeStyles((theme) => ({
	root: {
		flexShrink: 0,
		marginLeft: theme.spacing(2.5),
	},
}));